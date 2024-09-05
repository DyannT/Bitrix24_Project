<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class OAuthController extends Controller
{
    private $client;
    private $appId;
    private $appSecret;
    private $subdomain;

    public function __construct()
    {
        $this->client = new Client();
        $this->appId = env('BITRIX24_APP_ID');
        $this->appSecret = env('BITRIX24_APP_SECRET');
        $this->subdomain = env('BITRIX24_SUBDOMAIN');
    }

    public function install(Request $request)
    {
        $authUrl = "https://{$this->subdomain}.bitrix24.vn/oauth/authorize/?client_id={$this->appId}&response_type=code&redirect_uri=" . urlencode(route('oauth.callback'));
        return redirect($authUrl);
    }

    public function callback(Request $request)
    {

        $code = $request->query('code');
        if (!$code) {
            return response()->json(['error' => 'Authorization code missing'], 400);
        }

        try {
            $response = $this->client->post('https://oauth.bitrix.info/oauth/token/', [
                'form_params' => [
                    'grant_type' => 'authorization_code',
                    'client_id' => $this->appId,
                    'client_secret' => $this->appSecret,
                    'code' => $code,
                    'redirect_uri' => route('oauth.callback') // Ensure this matches your registered redirect URI
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            // Store tokens
            Cache::put('access_token', $data['access_token'], $data['expires_in']);
            Cache::put('refresh_token', $data['refresh_token'], $data['expires_in'] * 2);

            // Handle Install Event
            $this->handleInstallEvent($data['access_token']);
        } catch (\Exception $e) {
            Log::error('Error during OAuth callback: ' . $e->getMessage());
            return response()->json(['error' => 'OAuth callback failed'], 500);
        }

        return redirect('/'); // Redirect to a page in your app after successful authorization
    }

    private function handleInstallEvent($accessToken)
    {
        // Call Bitrix24 API to handle any initial setup after app install
        $response = $this->callApi('app.info', [], $accessToken);
        if (isset($response['error'])) {
            Log::error('Failed to handle install event: ' . $response['error_description']);
        }
    }

    private function getAccessToken()
    {
        $token = Cache::get('access_token');
        if (!$token) {
            throw new \Exception('No access token found.');
        }
        return $token;
    }

    private function renewToken()
    {
        $refreshToken = Cache::get('refresh_token');
        try {
            $response = $this->client->post('https://oauth.bitrix.info/oauth/token/', [
                'form_params' => [
                    'grant_type' => 'refresh_token',
                    'client_id' => $this->appId,
                    'client_secret' => $this->appSecret,
                    'refresh_token' => $refreshToken
                ]
            ]);

            $data = json_decode($response->getBody(), true);

            Cache::put('access_token', $data['access_token'], $data['expires_in']);
            Cache::put('refresh_token', $data['refresh_token'], $data['expires_in'] * 2);
        } catch (\Exception $e) {
            Log::error('Error during token renewal: ' . $e->getMessage());
            throw $e;
        }
    }

    private function callApi($endpoint, $params = [], $accessToken = null)
    {
        if (!$accessToken) {
            $accessToken = $this->getAccessToken();
        }

        try {
            $response = $this->client->get("https://{$this->subdomain}.bitrix24.vn/rest/{$endpoint}", [
                'headers' => [
                    'Authorization' => "Bearer " . $accessToken
                ],
                'query' => $params
            ]);

            return json_decode($response->getBody(), true);
        } catch (\GuzzleHttp\Exception\ClientException $e) {
            if ($e->getCode() == 401) { // Token expired
                $this->renewToken();
                return $this->callApi($endpoint, $params);
            }
            Log::error('API call error: ' . $e->getMessage());
            throw $e;
        } catch (\Exception $e) {
            Log::error('API call error: ' . $e->getMessage());
            throw $e;
        }
    }
}
