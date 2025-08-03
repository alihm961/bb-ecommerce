<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Traits\ApiResponseTrait; 
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class isAdmin
{

    use ApiResponseTrait;

    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if($user->role === 'admin') return $next($request);
        
        return $this->responseJSON(null, 'Unauthorized', 401);
    }
}
