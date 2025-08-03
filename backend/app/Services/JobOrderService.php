<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderPerHour;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class JobOrderService{
   static function sendMail($order){
       $user = $order->user;
       $email = $user->email;
       
       $text = "Thank you, {$user->name}!\n";
       $text .= "Your order #{$order->id} has been placed.\n";
       $text .= "Total: €{$order->price}\n";
       $text .= "We will notify you when it’s shipped.";
    
       Mail::raw($text, function($message) use($email) {
           $message->to($email)
                   ->subject('Your Order Invoice');
       });
   }

   static function logMessage($order){
        Log::info('Message sent to ' . $order->user->name . ' with message: Your order #' . $order->id . ' is confirmed.');
   }

   static function addOrderPerHour($order){
    $hour = Carbon::parse($order->created_at ?? now())->startOfHour();

        $existed_hour = OrderPerHour::where('hour', $hour)->first();

        if($existed_hour){
            $existed_hour->order_count += 1;
            $existed_hour->revenue += $order->price;
            $existed_hour->save();
        }else{
            $new_order_per_hour = new OrderPerHour();
            $new_order_per_hour->hour = $hour;
            $new_order_per_hour->order_count = 1;
            $new_order_per_hour->revenue = $order->price;
            $new_order_per_hour->save();
        }
   }

   static function WebHook($order){
        $response = Http::post('http://127.0.0.1:8000/api/v1/delivery-company', $order);
        Log::info('You have a response message from delivery company: ' . $response);
   }

    static function updateStock($products){
       foreach($products as $p){
            $product = Product::find($p['id']);
            $product->stock -= $p['quantity'];
            $product->save();
       }
   }


   static function addOrderItems($id, $products){
    $order = Order::find($id);
    foreach($products as $p){
        $prod = Product::find($p['id']);

        $order->products()->attach($prod->id, [
            'quantity' => $p['quantity'],
            'price' => $p['quantity'] * $prod->price
        ]);
    }
   }
}
