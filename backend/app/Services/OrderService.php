<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Jobs\LogOrderJob;
use App\Jobs\SendInvoiceJob;

class OrderService {

     static function create(Request $request) {

        $order = new Order();
        $order->user_id = $request->user_id;
        $order->price = $request->price;
        $order->save();
    

        SendInvoiceJob::dispatch($order);

        return $order;
    }
}