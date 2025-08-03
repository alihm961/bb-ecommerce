<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;

class NotificationController extends Controller{
    use ApiResponseTrait;

    function getNotifications($id){
        try {
            $notifications = NotificationService::getNotifications($id);
            if(!$notifications) return $this->responseJson(null, "Failed to get notifications");
            return $this->responseJson($notifications, "fetched notifications successfully");
        } catch (\Throwable $th) {
           return $this->responseJson(null, "Failed to get notifications");
        }
    }

    function readNotifications($id){
       try {
            $notification = NotificationService::readNotifications($id);
            if(!$notification) return $this->responseJson([], "No Notifications fot this time");
            return $this->responseJson($notification, "Read notification successfully");
        } catch (\Throwable $th) {
           return $this->responseJson(null, "Failed to read notification");
        } 
    }
}
