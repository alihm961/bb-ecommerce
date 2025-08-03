<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderPerHour>
 */
class OrderPerHourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'hour' => fake()->dateTime(),
            'order_count' => fake()->numberBetween(0, 10),
            'revenue' => fake()->randomFloat(2, 5, 9999),
        ];
    }
}
