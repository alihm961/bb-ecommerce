<?php

namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;
use App\Traits\ApiResponseTrait;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;

class OrderCreateRequest extends FormRequest{
    public function authorize(): bool{
        return true;
    }

    public function rules(): array {
        return [
            'user_id' => 'required',
            'price' => 'required|numeric|min:0',
        ];
    }

     protected function failedValidation(Validator $validator){
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException($this->responseJSON($errors, 'wrong inputs', 400));
    }
}
