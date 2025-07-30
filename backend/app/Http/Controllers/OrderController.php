<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Traits\ApiResponseTrait;

class OrderController extends Controller
{
    use ApiResponseTrait;

    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'total' => 'required|numeric|min:0',
        ]);

        $order = $this->orderService->place($validated);

        return $this->responseJSON($order, 'Order placed and invoice sent', 201);
    }
}
