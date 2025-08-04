<?php

namespace App\Jobs;

use App\Events\NewOrderCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class AdminBroadcastJob implements ShouldQueue{
    use Queueable;

    public $order;
    public function __construct($order){
        $this->order = $order;
    }

    public function handle(): void{ 
        event(new NewOrderCreated($this->order));
    }
}
