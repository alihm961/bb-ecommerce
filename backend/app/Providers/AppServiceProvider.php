<?php

namespace App\Providers;

use App\Traits\ApiResponseTrait;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider{

    use ApiResponseTrait;
    /**
     * Register any application services.
     */
    public function register(): void{
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void{
        RateLimiter::for('admin', function (Request $request) {
            return Limit::perMinute(60)->by($request->user()->id)->response(function(){
                return $this->responseJSON(null, 'Too many requests, try again in 1 minute', 429);
            });
        });

         RateLimiter::for('user', function (Request $request) {
            return Limit::perMinute(30)->by($request->user()->id)->response(function(){
                return $this->responseJSON(null, 'Too many requests, try again in 1 minute', 429);
            });
        });

         RateLimiter::for('guest', function (Request $request) {
            return Limit::perMinute(30)->by($request->ip())->response(function(){
                return $this->responseJSON(null, 'Too many requests, try again in 1 minute', 429);
            });
        });
    }
}
