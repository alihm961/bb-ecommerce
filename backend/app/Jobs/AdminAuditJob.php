<?php

namespace App\Jobs;

use App\Services\JobAuditAdminService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class AdminAuditJob implements ShouldQueue{
    use Queueable;

    public $id;
    public $message;
    public $tries = 10;
   public $backoff = 20;
    
    public function __construct($id, $message){
        $this->id = $id;
        $this->message = $message;
    }

    public function handle(): void{
        JobAuditAdminService::auditAdmin($this->id, $this->message);
    }
}
