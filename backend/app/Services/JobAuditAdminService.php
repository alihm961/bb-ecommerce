<?php

namespace App\Services;

use App\Models\AdminLogs;

class JobAuditAdminService{
   static function auditAdmin($id, $message){
        $adminLog = new AdminLogs();

        $adminLog->user_id = $id;
        $adminLog->log_message = $message;

        $adminLog->save();
   }
}
