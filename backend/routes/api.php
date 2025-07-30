<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;

Route::group(['prefix' => 'v1'], function () {

    Route::group(['prefix' => 'guest'], function () {
        Route::post('/register', [UserController::class, 'register']);
        Route::post('/login',    [UserController::class, 'login']);
        Route::get('/products', [ProductController::class, 'getAll']);
        Route::get('/products/{id}', [ProductController::class, 'getOne']);
    });


    Route::group(['middleware' => 'auth:api'], function() {
        Route::group(['prefix' => 'user'], function () {
            Route::post('/logout', [UserController::class, 'logout']);
            Route::post('/orders', [OrderController::class, 'create']);

        });
    
        Route::group(['prefix' => 'admin'], function () {
            Route::group(['middleware' => 'isAdmin'], function() {
                Route::get('/users', [UserController::class, 'getUsers']);
                Route::post('/create-product', [ProductController::class, 'create']);
                Route::post('/update-product/{id}', [ProductController::class, 'update']);
            });
        });
    });

});
