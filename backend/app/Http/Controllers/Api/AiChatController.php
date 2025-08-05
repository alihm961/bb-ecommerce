<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Message\SendChatMessageRequest;
use App\Services\ChatService;
use App\Traits\ApiResponseTrait;

class AiChatController extends Controller
{
    use ApiResponseTrait;
    protected ChatService $chatService;

    public function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }

    public function sendMessage(SendChatMessageRequest $request)
    {
        $result = $this->chatService->sendMessage(
            $request->input('session_id'),
            $request->input('message')
        );

        return $this->responseJSON($result, 'Message sent successfully');
    }

    public function getMessages($sessionId)
    {
        $messages = $this->chatService->getMessages($sessionId);
        return $this->responseJSON($messages, 'Chat history fetched');
    }
}
