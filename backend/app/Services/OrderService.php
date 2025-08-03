<?php

namespace App\Services;

use App\Jobs\AddNotificationJob;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Jobs\SendInvoiceJob;
use App\Jobs\LogMessageJob;
use App\Jobs\OrderPerHourJob;
use App\Jobs\WebhookJob;
use App\Jobs\UpdateStockJob;
use App\Jobs\AddOrderItemsJob;
use App\Jobs\AdminAuditJob;
use App\Models\OrderPerHour;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

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

    static function getAll(){
        $orders = Order::with('user:id,name')->get();
        return $orders;
    }

    static function updateOrder(Request $request, $id){
        $order = Order::find($id);
        $order->status = $request->status;
        $order->save();

        $user = Auth::user();

        AddNotificationJob::dispatch($order);
        AdminAuditJob::dispatch($user->id, "Admin {$user->name} updated order of id#{$order->id} to {$order->status}");

        return $order;
    }

    static function analytics(Request $request){
        $date = $request->query('date');

        $orders = Order::whereDate('created_at', $date ?? now())->get();
        $orders_per_hour = OrderPerHour::whereDate('created_at', $date ?? now())->get();

        $total_items = 0;
        $total_price = 0;
        foreach($orders as $order){
            $total_items += $order->items_count;
            $total_price += $order->price;
        }
        
        return [
            "Items sold" => $total_items,
            "Revenue" => $total_price,
            "orders per hour" => $orders_per_hour
        ];
    }
}