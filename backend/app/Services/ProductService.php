<?php

namespace App\Services;

use App\Jobs\AdminAuditJob;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Uid\Uuid;

class ProductService{
    static function create(Request $request){
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



    static function update(Request $request, $id){
        $product = Product::find($id);

        $product->name = $request->name ? $request->name : $product->name;
        $product->description = $request->description ? $request->description : $product->description;
        $product->image_url = $request->image_url ? $request->image_url : $product->image_url;
        $product->price = $request->price ? $request->price : $product->price;
        $product->category = $request->category ? $request->category : $product->category;
        $product->stock = $request->stock ? $request->stock : $product->stock;

        $product->save();
        Cache::flush();
        
        // cache::tags('products')->flush(); when use redis

        $user = Auth::user();
        AdminAuditJob::dispatch($user->id, "Admin {$user->name} updated product of id#{$product->id}");

        return $product;
    }



    static function getOne($id){
        try {
            $product = Product::find($id);
            return $product;
        } catch (\Throwable $th) {
            return null;
        }
    }


    static function getAll(Request $request){
        // $search = $request->query('search');
        // $category = $request->query('category');
        // $min_price = $request->query('min-price');
        // $max_price = $request->query('max-price');

        $filters = $request->only(['search', 'category', 'min-price', 'max-price']);
        $filters['page'] = $request->query('page', 1);

        $cash_key = 'Products' . json_encode([$filters]);

        $data = Cache::rememberForever($cash_key, function () use ($filters) {    
            
            Log::info('Cache Test');
            $query = Product::query();
    
            if (!empty($filters['search'])) $query->where('name', 'like', "%" . $filters['search'] . "%");
            if (!empty($filters['category'])) $query->where('category', $filters['category']);
            if (isset($filters['min-price'])) $query->where('price', '>=', $filters['min-price']);
            if (isset($filters['max-price'])) $query->where('price', '<=', $filters['max-price']);
            
            $paginated = $query->paginate(15);
            return ['products' => $paginated->items(), 'total' => $paginated->total()];
        });
    
        return $data;
    }

    static function delete($id){
        $product = Product::find($id);
        if ($product->delete()) {
            $user = Auth::user();
            AdminAuditJob::dispatch($user->id, "Admin {$user->name} deleted product of id#{$product->id}");
            
            // Cache::tags('products')->flush();   when use redis
            Cache::flush();
            return true;
        }

        return null;
    }
}
