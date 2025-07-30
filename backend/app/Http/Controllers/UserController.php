<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Traits\ApiResponseTrait;
use App\Http\Requests\User\UserRegisterRequest;
use App\Http\Requests\User\UserLoginRequest;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    use ApiResponseTrait;

    function register(UserRegisterRequest $request)
    {
        try {
            $user = UserService::register($request);
            return $this->responseJSON($user, 'Registration successful', 201);
        } catch (\Throwable $th) {
            return $this->responseJSON(null, 'Failed to create a user', 500);
        }
    }



    function login(UserLoginRequest $request)
    {
        try {
            $user = UserService::login($request);
            if(!$user) return $this->responseJSON(null, 'invalid email or password', 422);
            return $this->responseJSON($user, 'Logged in successful', 200);
        } catch (\Throwable $th) {
            return $this->responseJSON(null, 'Failed to login', 500);
        }
    }



    public function logout()
    {
        $response = JWTAuth::invalidate(JWTAuth::getToken());
        if (!$response)  return $this->responseJSON(null, 'Failed to log out', 400);
        return $this->responseJSON(null, 'Logged out successfully');
    }
}
