<?php

namespace App\Jobs;

use App\Mail\InvoiceMail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendInvoiceJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $order;

    public function __construct($order){
        $this->order = $order;
    }

    public function handle(): void{

        $order = $this->order;
        $user = $order->user;
        $email = $user->email;
        
        $text = "Thank you, {$user->name}!\n";
        $text .= "Your order #{$order->id} has been placed.\n";
        $text .= "Total: €{$order->price}\n";
        $text .= "We will notify you when it’s shipped.";

        Mail::raw($text, function($message) use($email) {
            $message->to($email)
                    ->subject('Your Order Invoice');
        });

    }
}