<?php

namespace App\Jobs;

use App\Services\ScheduledJobService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class ScheduledJob implements ShouldQueue{
    use Queueable;
    public function __construct(){
        
    }

    public function handle(): void{
        ScheduledJobService::sendEmail();
    }
}
