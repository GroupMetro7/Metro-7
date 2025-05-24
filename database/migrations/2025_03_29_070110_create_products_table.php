<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
          $table->id();
          $table->string('name')->unique();
          $table->timestamps();
        });
        \DB::table('categories')->insert([
            'name' => 'All',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Schema::create('products', function (Blueprint $table) {
          $table->id();
          $table->string('product_name');
          $table->decimal('price', 8, 2);
          $table->string('description')->nullable();
          $table->string('image')->nullable();
          $table->integer('quantity')->default(0);
          $table->integer('stock')->default(0);
          $table->unsignedBigInteger('category_id')->nullable();
          $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
          $table->foreignId('composite_id')->nullable()->constrained('stock_management')->onDelete('set null');
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::dropIfExists('products');
      Schema::dropIfExists('categories');
    }
};
