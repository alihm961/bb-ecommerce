<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\JobOrderService;

class LogMessageJob implements ShouldQueue
{
    use Queueable;

    public $order;
    public $tries = 10;
    public $backoff = 20;
    
    public function __construct($order)
    {
        $this->order = $order;
    }

    public function handle(): void
    {
        JobOrderService::logMessage($this->order);
    }
}
