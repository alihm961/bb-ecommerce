<?php

namespace Database\Seeders;
use App\Models\OrderPerHour;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderPerHourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OrderPerHour::factory(30)->create();
    }
}
