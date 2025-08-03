<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Queue;
use App\Jobs\SendInvoiceJob;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Controllers\OrderController;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_place_order_and_dispatch_invoice_job()
    {
        Queue::fake();

        $user = User::factory()->create();

        $payload = [
            'user_id' => $user->id,
            'total' => 199.99,
        ];

        $response = $this->actingAs($user, 'api')
            ->postJson('/api/v1/user/orders', $payload);

        $response->assertStatus(201);
        $response->assertJsonFragment(['message' => 'Order placed and invoice sent']);

        Queue::assertPushed(SendInvoiceJob::class);
    }
}