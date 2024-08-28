<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class EmployeeController extends Controller
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

    public function index()
    {
        $employees = $this->getEmployees();
        return view('employees.index', compact('employees'));
    }

    public function refresh()
    {
        $employees = $this->getEmployees();
        return response()->json($employees);
    }

    public function show($id)
    {
        $employee = $this->getEmployee($id);
        return response()->json($employee);
    }

    private function getAccessToken()
    {
        $response = $this->client->get("https://bx-oauth2.aasc.com.vn/bx/oauth2_token/{$this->appId}");
        $data = json_decode($response->getBody(), true);
        return $data['token'];
    }

    private function getEmployees()
    {
        $token = $this->getAccessToken();
        $response = $this->client->get("https://{$this->subdomain}.bitrix24.vn/rest/user.get", [
            'headers' => [
                'Authorization' => "Bearer {$token}"
            ]
        ]);
        return json_decode($response->getBody(), true)['result'];
    }

    private function getEmployee($id)
    {
        $token = $this->getAccessToken();
        $response = $this->client->get("https://{$this->subdomain}.bitrix24.vn/rest/user.get", [
            'headers' => [
                'Authorization' => "Bearer {$token}"
            ],
            'query' => ['ID' => $id]
        ]);
        return json_decode($response->getBody(), true)['result'][0];
    }
}
