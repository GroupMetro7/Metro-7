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
        Schema::create('stock_management', function (Blueprint $table) {
            $table->id();
            $table->string('SKU_NUMBER', 20);
            $table->string('ITEM_NAME', 55);
            $table->string('CATEGORY', 15);
            $table->integer('STOCK');
            $table->float('COST_PER_UNIT');
            $table->float('STOCK_VALUE');
            $table->string('STATUS');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_management');
    }
};
