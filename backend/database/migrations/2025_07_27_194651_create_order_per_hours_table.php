<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_per_hours', function (Blueprint $table) {
            $table->id();
            $table->timestamp('hour')->useCurrent()->unique();
            $table->integer('order_count')->default(0);
            $table->decimal('revenue', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_per_hours');
    }
};
