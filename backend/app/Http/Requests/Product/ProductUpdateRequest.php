<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;
use App\Traits\ApiResponseTrait;

use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductUpdateRequest extends FormRequest
{

    use ApiResponseTrait;
    
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => 'string|max:255',
            'image_url' => 'string',
            'price'     => 'numeric|min:0',
            'category' => 'in:laptops,gaming,mobile phone,home appliances',
            'stock'     => 'numeric|min:0',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $errors = (new ValidationException($validator))->errors();
        throw new HttpResponseException($this->responseJSON($errors, 'wrong inputs', 400));
    }
}
