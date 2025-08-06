<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;



class ChatEscalated implements ShouldBroadcast
{
    public $sessionId;
    public function __construct($sessionId)
    {
        $this->sessionId = $sessionId;
    }

    public function broadcastOn()
    {
        return new Channel('chat.admin');

    }
}
