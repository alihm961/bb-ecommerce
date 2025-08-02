<?php

namespace App\Services;

use App\Models\Notification;

class JobUpdateOrderService
{
    static function addNotification($order){
        $message = "Your order is {$order->status}";
        
        $notification = new Notification();
        $notification->user_id = $order->user_id;
        $notification->message = $message;
        $notification->is_read = 0;

        $notification->save();
    }
}
