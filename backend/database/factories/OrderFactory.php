<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1, 30),
            'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'delivered']),
            'items_count' => fake()->randomNumber(),
            'price' => fake()->randomFloat(2, 5, 9999),
        ];
    }
}
