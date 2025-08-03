<?php

namespace Database\Seeders;
use App\Models\AdminLogs;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminLogsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AdminLogs::factory(30)->create();
    }
}
