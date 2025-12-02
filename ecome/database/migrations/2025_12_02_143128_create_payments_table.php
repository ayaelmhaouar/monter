<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2);
            $table->string('payment_method'); // card, stripe, paypal, etc.
            $table->string('status'); // pending, completed, failed, refunded
            $table->string('transaction_id')->nullable();
            $table->string('payment_gateway')->nullable(); // stripe, paypal, etc.
            $table->json('payment_details')->nullable(); // Stocker les détails de la transaction
            $table->timestamp('paid_at')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
};