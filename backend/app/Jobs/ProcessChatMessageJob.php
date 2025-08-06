<?php

namespace App\Jobs;

use App\Models\ChatMessage;
use App\Models\ChatSession;
use App\Services\AiService;
use App\Services\ChatService;
use App\Events\ChatResponseReceived;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessChatMessageJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected ChatSession $session;
    protected ChatMessage $message;

    public function __construct(ChatSession $session, ChatMessage $message)
    {
        $this->session = $session;
        $this->message = $message;
    }

    public function handle(AiService $aiService, ChatService $chatService)
    {
        // Build context
        $context = $this->session->messages()
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

        // Escalation if Ai fails
        if (!$aiResponse) {
            $chatService->notifyAdmins($this->session);
            $aiResponse = "Sorry, I couldn't process that request. An admin has been notified.";
        }

        $reply = ChatMessage::create([
            'session_id' => $this->session->id,
            'sender_type' => 'ai',
            'content' => $aiResponse,
        ]);

        // Broadcast
        broadcast(new ChatResponseReceived($this->session->id, $reply))->toOthers();
    }
}

