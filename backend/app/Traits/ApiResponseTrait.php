<?php

namespace App\Traits;

trait ApiResponseTrait {
    
    protected function responseJSON($data = null, $message = "success", $status = 200) {

        return response()->json([
            'success' => $status === 200 || $status === 201,
            'message' => $message,
            'data' => $data
        ], $status);
    }
}