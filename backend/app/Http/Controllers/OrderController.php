<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Traits\ApiResponseTrait;
use App\Http\Requests\Order\OrderCreateRequest;

class OrderController extends Controller{

    use ApiResponseTrait;

    function create(OrderCreateRequest $request){
        try {
            $order = OrderService::create($request);
            if(is_array($order)) return $this->responseJSON($order, 'failed', 400);
            return $this->responseJSON($order, 'Order placed and invoice sent', 201);
        } catch (\Throwable $th) {
            return $this->responseJSON(null, 'Failed to add order', 500);
        }
    }

    function getOrders(){
        try {
            $orders = OrderService::getAll();
            if(!$orders) return $this->responseJSON(null, 'failed to get orders', 500);
            return $this->responseJSON($orders, 'Orders fetched successfully', 200);
        } catch (\Throwable $th) {
           return $this->responseJSON(null, 'failed to get orders', 500);
        }
    }

       function getUserOrders($id){
        try {
            $orders = OrderService::getAllUserOrder($id);
            if(count($orders) === 0) return $this->responseJSON(null, "no orders for this user", 500);
            return $this->responseJSON($orders, "User's Orders fetched successfully", 200);
        } catch (\Throwable $th) {
           return $this->responseJSON(null, "failed to get user's orders", 500);
        }
    }


    function updateOrder(Request $request, $id){
        try {
            $order = OrderService::updateOrder($request, $id);
            if(!$order) return $this->responseJSON(null, 'failed to update order', 500);
            return $this->responseJSON($order, 'Order updated successfully', 200);
        } catch (\Throwable $th) {
           return $this->responseJSON(null, 'failed to update order', 500);
        }
    }

    function analytics(Request $request){
        try {
            $analytics = OrderService::analytics($request);
            if(!$analytics) return $this->responseJSON(null, 'failed to fetch analytics order', 500);
            return $this->responseJSON($analytics, 'Fetched Analytics successfully', 200);
        } catch (\Throwable $th) {
           return $this->responseJSON(null, 'failed to fetch analytics order', 500);
        }
    }
}
