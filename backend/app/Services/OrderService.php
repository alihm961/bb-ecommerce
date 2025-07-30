<?php

namespace App\Services;

use App\Models\Order;
use App\Jobs\SendInvoiceJob;

class OrderService {

     function place(array $data) {

        $order = Order::create([
            'user_id' => $data['user_id'],
            'price'   => $data['total'],
            'status' => 'pending',
        ]);

        SendInvoiceJob::dispatch($order);

        return $order;
    }
}