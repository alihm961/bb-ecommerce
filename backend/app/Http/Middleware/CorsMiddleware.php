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
        return $next($request);
    }
}
