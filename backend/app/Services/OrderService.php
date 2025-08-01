<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Jobs\SendInvoiceJob;
use App\Jobs\LogMessageJob;
use App\Jobs\OrderPerHourJob;
use App\Jobs\WebhookJob;
use App\Jobs\UpdateStockJob;
use App\Jobs\AddOrderItemsJob;
use App\Models\Product;
use Exception;

class OrderService {

     static function create(Request $request) {

        $products = $request->products;
        $total_price = 0;

        foreach($products as $p){
            $product = Product::where('id', $p['id'])->lockForUpdate()->first();
            if($product->stock < $p['quantity']) return ['error' => "Product {$product->name} is out of stock for this quantity"];
            $price = $p['quantity'] * $product->price;
            $total_price += $price;
        }

        $order = new Order();
        $order->user_id = $request->user_id;
        $order->price = $total_price;
        $order->items_count = count($products);
        $order->save();
    

        SendInvoiceJob::dispatch($order);
        LogMessageJob::dispatch($order);
        OrderPerHourJob::dispatch($order);
        WebhookJob::dispatch($order);
        UpdateStockJob::dispatch($products);
        AddOrderItemsJob::dispatch($order->id, $products);

        return $order;
    }
}