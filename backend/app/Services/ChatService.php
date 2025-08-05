<?php

namespace App\Services;

use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Jobs\ProcessChatMessageJob;
use Illuminate\Support\Facades\Auth;
use App\Events\ChatResponseReceived;

class ChatService
{

    public function sendMessage(?int $sessionId, string $message): array
    {
        $user = Auth::user();

        
        if (!$sessionId) {
            $session = ChatSession::create([
                'user_id' => $user->id,
                'status' => 'active',
            ]);
            $sessionId = $session->id;
        } else {
            $session = ChatSession::where('id', $sessionId)
                ->where('user_id',
                $user->id)
                ->firstOrFail();
        }

        $chatMessage = ChatMessage::create([
            'session_id' => $sessionId,
            'sender_type' => 'user',
            'sender_id' => $user->id,
            'content' => $message,
        ]);

        // Dispatch AI processing job
        ProcessChatMessageJob::dispatch($session, $chatMessage);

        return [
            'session_id' => $sessionId,
            'message_id' => $chatMessage->id,
        ];
    }

//chat history
    public function getMessages(int $sessionId)
    {
        return ChatSession::where('id', $sessionId)
            ->where('user_id', Auth::id())
            ->with('messages')
            ->firstOrFail()
            ->messages;
    }

//Ai logic
    public function processAiResponse(ChatSession $session, ChatMessage $message, $aiService)
    {
        //build the message
        $context = $session->messages()
            ->latest()
            ->take(10)
            ->get()
            ->reverse()
            ->map(fn($msg) => [
                'role' => $msg->sender_type === 'user' ? 'user' : 'assistant',
                'content' => $msg->content
            ])
            ->toArray();

        $aiResponse = $aiService->generateResponse($context);

        $reply = ChatMessage::create([
            'session_id' => $session->id,
            'sender_type' => 'ai',
            'content' => $aiResponse ?? "Sorry, I couldn't process that request.",
        ]);

        // Broadcast AI response
        broadcast(new ChatResponseReceived($session->id, $reply))->toOthers();

        return $reply;
    }

    private function getUserSession(int $sessionId, int $userId): ChatSession
    {
        return ChatSession::where('id', $sessionId)
            ->where('user_id', $userId)
            ->firstOrFail();
    }
    
}
