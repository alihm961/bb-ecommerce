<?php

namespace App\Http\Controllers\Api;
use App\Models\ChatSession;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ChatService;
use App\Traits\ApiResponseTrait;

class AdminChatController extends Controller
{
        use ApiResponseTrait;
    protected ChatService $chatService;

    public function __construct(ChatService $chatService)
    {
        $this->chatService = $chatService;
    }

    public function reply(Request $request, $sessionId)
    {
        $request->validate([
            'message' => 'required|string|max:1000'
        ]);

        $reply = $this->chatService->replyAsAdmin($sessionId, $request->input('message'));

        return $this->responseJSON($reply, 'Reply sent successfully');
    }

    public function escalatedChats()
{
    $chats = ChatSession::where('status', 'escalated')
        ->with('messages') // eager load messages
        ->latest()
        ->get();

    return $this->responseJSON($chats, 'Escalated chats fetched');
}
public function chatHistory($sessionId)
{
    $session = ChatSession::with('messages')->findOrFail($sessionId);
    return $this->responseJSON($session, 'Chat history fetched');
}

}
