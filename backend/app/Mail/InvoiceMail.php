<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InvoiceMail extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function build()
    {
        $text = "Thank you, {$this->order->user->name}!\n";
        $text .= "Your order #{$this->order->id} has been placed.\n";
        $text .= "Total: €{$this->order->total}\n";
        $text .= "We will notify you when it’s shipped.";

        return $this->subject('Your Invoice')
                    ->raw($text); 
    }
}
