<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array{

        $imagePath = storage_path('app/public/images');
        $imageFiles = glob($imagePath . '/*.*');
        $randomImageFullPath = $imageFiles[array_rand($imageFiles)];
        $randomImage = 'images/' . basename($randomImageFullPath);

        return [
            'name' => fake()->name(),
            'description' => fake()->realText(200),
            'image_url' => $randomImage,
            'price' => fake()->numberBetween(30, 200),
            'category' => fake()->randomElement(['mobile phone', 'laptops', 'gaming', 'home appliances']),
            'stock' => fake()->numberBetween(0, 200)            
        ];
    }
}
