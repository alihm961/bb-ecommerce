<?php

namespace App\Jobs;

use App\Services\JobService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class WebhookJob implements ShouldQueue
{
    use Queueable;

    public $order;

    public function __construct($order){
        $this->order = $order;
    }

    public function handle(): void{
        JobService::WebHook($this->order);
    }
}
