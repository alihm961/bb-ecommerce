<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Traits\ApiResponseTrait; 
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{

public function handle(Request $request, Closure $next): Response
    {
    
        
        
        if ($request->getMethod() === 'OPTIONS') {
            $response = $next($request);
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            $response->headers->set('Access-Control-Allow-Credentials', 'true');
        }
    return $response;
    
    }
}
