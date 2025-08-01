<?php

namespace App\Jobs;

use App\Services\JobService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class UpdateStockJob implements ShouldQueue
{
    use Queueable;

    public $products;

    public function __construct($products){
        $this->products = $products;
    }

    public function handle(): void{
        JobService::updateStock($this->products);      
    }
}
