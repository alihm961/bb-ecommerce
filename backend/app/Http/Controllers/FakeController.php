<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FakeController extends Controller
{
    function sendOrder(Request $request){
        Log::info($request);
        
        $text = "Order is received and start packaging it. we will respond when the order is shipped";
        return $text;
    }
}
