<?php

namespace App\Services;
use App\Models\User;
use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Jobs\ProcessChatMessageJob;
use Illuminate\Support\Facades\Auth;
use App\Events\ChatResponseReceived;
use App\Events\ChatEscalated;

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

        // Escalate to admins
    if (!$aiResponse) {
        $this->notifyAdmins($session);

        $fallbackMessage = "Sorry, I couldn't process that request. An admin has been notified.";
        } else {
        $fallbackMessage = $aiResponse;
        }

    $reply = ChatMessage::create([
        'session_id' => $session->id,
        'sender_type' => 'ai',
        'content' => $fallbackMessage,
        
    ]);



    broadcast(new ChatResponseReceived($session->id, $reply))->toOthers();

    return $reply;
}
    

public function notifyAdmins(ChatSession $session)
{
    $session->update(['status' => 'escalated']);

    $admins = User::where('role', 'admin')->get();
    foreach ($admins as $admin) {
        $admin->notifications()->create([
        'message' => "Chat #{$session->id} has been escalated and requires attention.",
        'is_read' => 0,
        ]);
    }
        broadcast(new ChatEscalated($session->id))->toOthers();
        
    }
    

    private function getUserSession(int $sessionId, int $userId): ChatSession
    {
        return ChatSession::where('id', $sessionId)
            ->where('user_id', $userId)
            ->firstOrFail();
    }

    public function replyAsAdmin(int $sessionId, string $message)
{
    $session = ChatSession::where('id', $sessionId)->firstOrFail();

    if ($session->status !== 'escalated') {
        throw new \Exception('This chat is not escalated.');
    }

    
    $reply = ChatMessage::create([
        'session_id' => $session->id,
        'sender_type' => 'admin',
        'content' => $message,
    ]);

    // Broadcast to the user
    broadcast(new ChatResponseReceived($session->id, $reply))->toOthers();

    return $reply;
}

    
}
