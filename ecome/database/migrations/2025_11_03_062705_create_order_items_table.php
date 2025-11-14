<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_order_items_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->foreignId('watch_id')->constrained()->onDelete('cascade');
            $table->string('watch_name');
            $table->decimal('unit_price', 10, 2);
            $table->integer('quantity');
            $table->decimal('total_price', 10, 2);
            $table->json('watch_snapshot')->nullable()->comment('Snapshot des données de la montre au moment de la commande');
            $table->timestamps();
            
            $table->index(['order_id', 'watch_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('order_items');
    }
};