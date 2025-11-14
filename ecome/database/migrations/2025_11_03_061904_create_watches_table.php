<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_watches_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('watches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
         
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->decimal('compare_price', 10, 2)->nullable();
            $table->string('sku')->unique();
            $table->string('brand');
            $table->string('model');
            $table->string('gender')->comment('homme, femme, unisexe');
            $table->string('movement')->comment('quartz, automatique, mécanique');
            $table->string('case_material');
            $table->string('strap_material');
            $table->string('case_diameter');
            $table->string('water_resistance');
            $table->string('crystal');
            $table->json('features')->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['is_active', 'is_featured']);
            $table->index(['category_id', 'is_active']);
            $table->fullText(['name', 'description', 'brand', 'model']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('watches');
    }
};