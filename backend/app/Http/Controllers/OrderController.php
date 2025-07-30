<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Http\Requests\Order\OrderCreateRequest;
use App\Traits\ApiResponseTrait;

class OrderController extends Controller{

    use ApiResponseTrait;

    public function create(OrderCreateRequest $request){
        try {
            $order = OrderService::create($request);
            if(!$order) return $this->responseJSON(null, 'Failed to add order', 500);
            return $this->responseJSON($order, 'Order placed and invoice sent', 201);
        } catch (\Throwable $th) {
            return $this->responseJSON(null, 'Failed to add order', 500);
        }
    }
}
