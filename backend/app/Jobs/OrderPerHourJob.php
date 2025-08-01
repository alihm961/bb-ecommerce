<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\JobService;

class OrderPerHourJob implements ShouldQueue
{
    use Queueable;

    public $order;
    public function __construct($order){
        $this->order = $order;
    }

    public function handle(): void{
        JobService::addOrderPerHour($this->order);
    }
}
