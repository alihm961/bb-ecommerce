<?php

use App\Http\Controllers\Api\AiChatController;
use App\Http\Controllers\Api\AdminChatController;
use App\Http\Controllers\FakeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use Illuminate\Notifications\Events\NotificationSent;


Route::group(['prefix' => 'v1'], function () {
    Route::middleware('cors')->group(function () {

        // Fake Controller works as a delivery company, this a quick way to make a limit rating 
        Route::middleware('throttle:60,1')->group(function () {
            Route::post('/delivery-company', [FakeController::class, 'sendOrder']);
        });


        Route::group(['prefix' => 'guest', 'middleware' => 'throttle:guest'], function () {
            Route::post('/register', [UserController::class, 'register']);
            Route::post('/login', [UserController::class, 'login']);
            Route::get('/products', [ProductController::class, 'getAll']);
            Route::get('/products/{id}', [ProductController::class, 'getOne']);
        });


        Route::group(['middleware' => 'auth:api'], function () {
            Route::group(['prefix' => 'user', 'middleware' => 'throttle:user'], function () {

                // user routes
                Route::post('/logout', [UserController::class, 'logout']);

                // order routes
                Route::post('/orders', [OrderController::class, 'create']);
                Route::get('/orders/{id}', [OrderController::class, 'getUserOrders']);

                //Ai Routes
                Route::group(['prefix' => 'ai'], function () {
                    Route::post('/chat', [AiChatController::class, 'sendMessage']);
                    Route::get('/chat/{session_id}', [AiChatController::class, 'getMessages']);
                });

                // notification routes
                Route::get('/notifications/{id}', [NotificationController::class, 'getNotifications']);
                Route::get('/read-notifications/{id}', [NotificationController::class, 'readNotifications']);
            });

            Route::group(['prefix' => 'admin'], function () {
                Route::middleware(['isAdmin', 'throttle:admin'])->group(function () {
                    // user routes
                    Route::get('/users', [UserController::class, 'getUsers']);

                    //products routes
                    Route::get('/delete-product/{id}', [ProductController::class, 'delete']);
                    Route::post('/create-product', [ProductController::class, 'create']);
                    Route::post('/update-product/{id}', [ProductController::class, 'update']);

                    // order routes
                    Route::get('/orders', [OrderController::class, 'getOrders']);
                    Route::post('/orders/{id}', [OrderController::class, 'updateOrder']);
                    Route::get('/orders-analytics', [OrderController::class, 'analytics']);
                    //admin reply
                    Route::post('/chats/reply/{sessionId}', [AdminChatController::class, 'reply']);
                });
            });
        });
    });
});
