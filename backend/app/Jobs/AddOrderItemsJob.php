<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Services\JobService;

class AddOrderItemsJob implements ShouldQueue
{
    use Queueable;

   public $id;
   public $products;

    public function __construct($id, $products){
        $this->id = $id;
        $this->products = $products;
    }

    public function handle(): void{
        JobService::addOrderItems($this->id, $this->products);
    }
}
