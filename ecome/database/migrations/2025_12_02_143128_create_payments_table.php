<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('payments')) {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id'); // Pas de foreign key ici
            $table->decimal('amount', 10, 2);
            $table->string('status')->default('pending');
            $table->string('payment_method');
            $table->string('transaction_id')->nullable();
            $table->json('details')->nullable();
            $table->timestamps();
            
            $table->index('order_id');
        });
    }
    }

    public function down()
    {
        Schema::dropIfExists('payments');
    }
};