<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;
use App\Traits\ApiResponseTrait;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductCreateRequest extends FormRequest{

    use ApiResponseTrait;

    public function authorize(): bool {
        return true;
    }

    public function rules(): array {
        return [
            'name'     => 'required|string|max:255',
            'description'    => 'required',
            'image_url' => 'required|string',
            'price'     => 'required|numeric|min:0',
            'category' => 'required|in:laptops,gaming,mobile phone,home appliances',
            'stock'     => 'required|integer|min:0',
        ];
    }

    protected function failedValidation(Validator $validator){
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException($this->responseJSON($errors, 'wrong inputs', 400));
    }
}
