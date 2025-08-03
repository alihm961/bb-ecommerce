<?php

namespace App\Jobs;

use App\Services\JobOrderService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class UpdateStockJob implements ShouldQueue{
    use Queueable;

    public $products;
    public $tries = 10;
    public $backoff = 20;

    public function __construct($products){
        $this->products = $products;
    }

    public function handle(): void{
        JobOrderService::updateStock($this->products);      
    }
}
