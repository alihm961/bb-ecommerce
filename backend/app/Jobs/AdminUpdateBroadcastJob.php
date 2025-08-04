<?php

namespace App\Jobs;

use App\Events\OrderUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class AdminUpdateBroadcastJob implements ShouldQueue{
    use Queueable;
    public $order;

    public function __construct($order){
        $this->order = $order;    
    }

    public function handle(): void {
        event(new OrderUpdated($this->order));
    }
}
