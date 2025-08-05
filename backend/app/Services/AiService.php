<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AiService
{
    protected string $apiKey;
    protected string $apiUrl;

    public function __construct()
    {
        $this->apiKey = config('services.openai.key'); 
        $this->apiUrl = 'https://api.openai.com/v1/chat/completions';
    }

    public function generateResponse(array $messages): ?string
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$this->apiKey}",
            'Content-Type' => 'application/json',
        ])->post($this->apiUrl, [
            'model' => 'gpt-4o-mini',
            'messages' => array_merge(
                [['role' => 'system', 'content' => 'You are a helpful e-commerce assistant.']],
                $messages
            ),
            'max_tokens' => 200,
        ]);

    if ($response->failed()) {
        Log::error('AI request failed', [
            'status' => $response->status(),
            'body' => $response->body()
        ]);
        return null;
    }

    return $response->json('choices.0.message.content');
}
}
