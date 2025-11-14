<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_orders_table

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax', 10, 2)->default(0);
            $table->decimal('shipping', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->string('status')->default('pending')->comment('pending, processing, shipped, delivered, cancelled');
            $table->string('payment_status')->default('pending')->comment('pending, paid, failed, refunded');
            $table->string('payment_method')->nullable();
            $table->text('notes')->nullable();
            
            // Informations de livraison
            $table->string('shipping_first_name');
            $table->string('shipping_last_name');
            $table->string('shipping_email');
            $table->string('shipping_phone');
            $table->string('shipping_address');
            $table->string('shipping_city');
            $table->string('shipping_zip_code');
            $table->string('shipping_country');
            
            // Informations de facturation
            $table->string('billing_first_name');
            $table->string('billing_last_name');
            $table->string('billing_email');
            $table->string('billing_phone');
            $table->string('billing_address');
            $table->string('billing_city');
            $table->string('billing_zip_code');
            $table->string('billing_country');
            
            $table->timestamp('shipped_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'status']);
            $table->index(['status', 'payment_status']);
            $table->index('order_number');
        });
    }

    public function down()
    {
        Schema::dropIfExists('orders');
    }
};