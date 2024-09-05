<?php
namespace App\Http\Controllers;

use App\Crest\crest;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ContactController extends Controller
{
    private $client;

    private $subdomain;

    private $restWebhook;
    private $crest;

    public function __construct(crest $crest)
    {
        $this->client = new Client();
        $this->subdomain = env('BITRIX24_SUBDOMAIN');
        $this->restWebhook = env('C_REST_WEBHOOK_URL');
        $this->crest = $crest;
        $this->crest::installApp();
    }

    public function index()
    {
        $contacts = $this->crest::call('crm.contact.list', [
            'select' => ['ID', 'NAME', 'PHONE', 'EMAIL', 'WEB', 'ADDRESS', 'BANK_INFO']
        ]);

        if (!empty($contacts['result'])) {
            return view('contacts.index', compact('contacts'));
        }

        return redirect()->route('oauth.install')->with('error', $contacts['error_information']);
    }


    public function create()
    {
        return view('contacts.create');
    }

    public function store(Request $request)
    {
        $params = [
            'FIELDS' => [
                'NAME' => $request->input('NAME') ?? null,
                'ADDRESS' => $request->input('ADDRESS') ?? null,
                'PHONE' => [
                    0 => [
                        'VALUE' => $request->input('PHONE') ?? null,
                        'VALUE_TYPE' => 'WORK'
                    ]
                ],
                'EMAIL' => [
                    0 => [
                        'VALUE' => $request->input('EMAIL') ?? null,
                    ]
                ],
                'WEB' => [
                    0 => [
                        'VALUE' => $request->input('WEB') ?? null,
                        'VALUE_TYPE' => 'WORK',
                        'TYPE_ID' => 'WEB'
                    ]
                ],
                'BANK_INFO' => $request->input('BANK_INFO') ?? null,
            ]
        ];
        $this->crest::call('crm.contact.add', $params);

        return redirect()->route('contacts.index');
    }

    public function edit(int $id)
    {
        $contact = $this->crest::call('crm.contact.get', ['id' => $id]);
        return view('contacts.edit', compact('contact'));
    }

    public function update(Request $request, int $id)
    {
        $params = [
                'FIELDS' => [
                    'NAME' => $request->input('NAME') ?? null,
                    'ADDRESS' => $request->input('ADDRESS') ?? null,
                    'PHONE' => [
                        0 => [
                            'VALUE' => $request->input('PHONE') ?? null,
                            'VALUE_TYPE' => 'WORK'
                        ]
                    ],
                    'EMAIL' => [
                        [
                            'VALUE' => $request->input('EMAIL') ?? null,
                        ]
                    ],
                    'WEB' => [
                        0 => [
                            'VALUE' => $request->input('WEB') ?? null,
                            'VALUE_TYPE' => 'WORK',
                            'TYPE_ID' => 'WEB',
                        ]
                    ],
                    'BANK_INFO' => $request->input('BANK_INFO') ?? null,
                ]
            ];
        $this->crest::call('crm.contact.update', array_merge(['ID' => $id], $params));

        return redirect()->route('contacts.index');
    }

    public function destroy(int $id)
    {
        $this->crest::call('crm.contact.delete', ['id' => $id]);
        return redirect()->route('contacts.index');
    }
}
