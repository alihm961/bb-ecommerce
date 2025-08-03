<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => fake()->numberBetween(1, 30),
            'order_id' => fake()->numberBetween(1, 30),
            'quantity' => fake()->numberBetween(1, 10),
            'price' => fake()->randomFloat(2, 5, 9999),
        ];
    }
}
