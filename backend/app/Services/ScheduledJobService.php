<?php

namespace App\Services;

use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ScheduledJobService{

    static function sendEmail(){

        $admins = User::where('role', 'admin');
        $orders = Order::whereDate('created_at', now())->get();

        if($orders->isEmpty()){
          $text = "Hey admin, no orders for today\n";  
        } else{
            $text = "Hey Admin, this is a detailed today's orders and revenue.\n";
            $total_price = 0;
     
            foreach($orders as $order){
             $text .= "Order number #{$order->id}, with item count {$order->items_count} and price \${$order->price}\n";
             $total_price += $order->price;
            }
     
            $text .= "Total revenue for today: \${$total_price}\n\n";
            $text .= "Thank you";
        }

        foreach($admins as $admin){
            Mail::raw($text, function($message, $admin) {
                $message->to($admin->email)
                        ->subject("Today's Orders and Revenue");
            });
        }
    
    }
}
