<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_reviews_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('watch_id')->constrained()->onDelete('cascade');
            $table->foreignId('order_id')->constrained()->onDelete('cascade');
            $table->integer('rating')->comment('1 to 5');
            $table->string('title');
            $table->text('comment');
            $table->boolean('is_approved')->default(false);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            
            $table->unique(['user_id', 'watch_id', 'order_id']);
            $table->index(['watch_id', 'is_approved', 'rating']);
            $table->index(['is_approved', 'created_at']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reviews');
    }
};