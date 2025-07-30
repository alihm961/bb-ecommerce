<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->realText(200),
            'image_url' => $this->faker->imageUrl(640, 480, 'technics', true, 'Electronics'),
            'price' => fake()->numberBetween(30, 200),
            'category' => fake()->randomElement(['mobile phone', 'laptops', 'gaming', 'home appliances']),
            'stock' => fake()->numberBetween(0, 200)            
        ];
    }
}
