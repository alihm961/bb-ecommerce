<?php

namespace App\Jobs;

use App\Services\JobUpdateOrderService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class AddNotificationJob implements ShouldQueue
{
    use Queueable;

   public $order; 
   public $tries = 10;
   public $backoff = 20;

    public function __construct($order){
        $this->order = $order;
    }

    public function handle(): void{
        JobUpdateOrderService::addNotification($this->order);
    }
}
