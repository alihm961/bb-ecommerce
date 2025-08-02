<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\JobOrderService;

class AddOrderItemsJob implements ShouldQueue
{
    use Queueable;

   public $id;
   public $products;
   public $tries = 10;
   public $backoff = 20;

    public function __construct($id, $products){
        $this->id = $id;
        $this->products = $products;
    }

    public function handle(): void{
        JobOrderService::addOrderItems($this->id, $this->products);
    }
}
