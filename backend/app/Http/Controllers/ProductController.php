<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\ApiResponseTrait;
use App\Services\ProductService;
use App\Http\Requests\Product\ProductCreateRequest;
use App\Http\Requests\Product\ProductUpdateRequest;


class ProductController extends Controller
{

    use ApiResponseTrait;


    function create(ProductCreateRequest $request)
    {
        try {
            $product = ProductService::create($request);
            if (!$product) return $this->responseJSON(null, "Failed to create product", 500);
            return $this->responseJSON($product, "Product created successfully", 201);
        } catch (\Throwable $th) {
            return $this->responseJSON(null, "Failed to create product", 500);
        }
    }

    function update(ProductUpdateRequest $request, $id)
    {
        try {
            $product = ProductService::update($request, $id);
            if (!$product) return $this->responseJSON(null, "Failed to update product", 500);

            return $this->responseJSON($product, "Product updated successfully", 200);
        } catch (\Throwable $th) {
            return $this->responseJSON(null, "Failed to update product", 500);
        }
    }


    function getOne($id)
    {
        $product = ProductService::getOne($id);
        if (!$product) return $this->responseJSON(null, "Failed to get product number {$id}", 500);

        return $this->responseJSON($product, "Product fetched successfully", 200);
    }

    function getAll(Request $request)
    {
        $data = ProductService::getAll($request);
        if (!$data) return $this->responseJSON(null, "Failed to get all products", 500);

        return $this->responseJSON($data, "Products fetched successfully", 200);
    }
}
