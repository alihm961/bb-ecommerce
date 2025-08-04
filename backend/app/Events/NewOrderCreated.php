<?php

namespace App\Events;

use COM;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class NewOrderCreated implements ShouldBroadcast {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $order;

    public function __construct($order){
        $this->order = $order->load('user:id,name');
    }

    public function broadcastOn(): array{
        return [
            new Channel('admin-order'),
            new Channel("user-order-{$this->order->user_id}"),
        ];
    }

    public function broadcastAs():string{
        return 'order-created';
    }
}
