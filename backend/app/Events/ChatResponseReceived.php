<?php

namespace App\Events;

use App\Models\ChatMessage;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class ChatResponseReceived implements ShouldBroadcast
{
    use SerializesModels;

    public $sessionId;
    public $message;

    public function __construct($sessionId, ChatMessage $message)
    {
        $this->sessionId = $sessionId;
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chat.' . $this->sessionId);
    }
}
