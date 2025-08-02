<?php

namespace App\Jobs;

use App\Services\JobOrderService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class WebhookJob implements ShouldQueue
{
    use Queueable;

    public $order;
    public $tries = 10;
    public $backoff = 20;

    public function __construct($order){
        $this->order = $order;
    }

    public function handle(): void{
        JobOrderService::WebHook($this->order);
    }
}
