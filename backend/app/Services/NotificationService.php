<?php

namespace App\Services;

use App\Models\Notification;

class NotificationService
{
   static function getNotifications($id){
        $notifications = Notification::where('user_id', $id)->where('is_read', 0)->get();
        return $notifications;
    }

    static function readNotifications($id){
        $notifications = Notification::find($id);
        $notifications->is_read = 1;
        $notifications->save();
        return $notifications;
    }
}
