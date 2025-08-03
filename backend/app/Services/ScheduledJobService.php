<?php

namespace App\Services;

use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ScheduledJobService{

    static function sendEmail(){
        Log::info("Schedule test");

       $text = "Test Email at 6am";
    
       Mail::raw($text, function($message) {
           $message->to('manana.ahmad.17@gmail.com')
                   ->subject('Schedule test');
       });
    }
}
