<?php

namespace App\Services;

use App\Jobs\AdminAuditJob;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProductService
{
    static function create(Request $request)
    {
        $product = new Product();

        $product->name = $request->name;
        $product->description = $request->description;
        $product->image_url = $request->image_url;
        $product->price = $request->price;
        $product->category = $request->category;
        $product->stock = $request->stock;

        $product->save();

        $user = Auth::user();
        AdminAuditJob::dispatch($user->id, "Admin {$user->name} created product of id#{$product->id}");

        return $product;
    }



    static function update(Request $request, $id)
    {
        $product = Product::find($id);

        $product->name = $request->name ? $request->name : $product->name;
        $product->description = $request->description ? $request->description : $product->description;
        $product->image_url = $request->image_url ? $request->image_url : $product->image_url;
        $product->price = $request->price ? $request->price : $product->price;
        $product->category = $request->category ? $request->category : $product->category;
        $product->stock = $request->stock ? $request->stock : $product->stock;

        $product->save();

        $user = Auth::user();
        AdminAuditJob::dispatch($user->id, "Admin {$user->name} updated product of id#{$product->id}");


        return $product;
    }



    static function getOne($id)
    {
        try {
            $product = Product::find($id);
            return $product;
        } catch (\Throwable $th) {
            return null;
        }
    }


    static function getAll(Request $request)
    {
        $search = $request->query('search');
        $category = $request->query('category');
        $min_price = $request->query('min-price');
        $max_price = $request->query('max-price');

        try {

            $query = Product::query();

            if ($search) $query->where('name', 'like', "%$search%");
            if ($category) $query->where('category', $category);
            if ($min_price) $query->where('price', '>=', $min_price);
            if ($max_price) $query->where('price', '<=', $max_price);

            $products = $query->paginate(15)->items();
            $total = $query->paginate(15)->total();

            return ['products' => $products, 'total' => $total];
        } catch (\Throwable $th) {
            return null;
        }
    }

    static function delete($id){
        $product = Product::find($id);
        if ($product->delete()) {
            $user = Auth::user();
            AdminAuditJob::dispatch($user->id, "Admin {$user->name} deleted product of id#{$product->id}");
            return true;
        }

        return null;
    }
}
