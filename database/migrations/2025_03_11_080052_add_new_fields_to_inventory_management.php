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
        Schema::table('inventory_management', function (Blueprint $table) {
          $table->string('SKU_NUMBER', 20)->after('id');
          $table->string('ITEM_NAME', 55)->after('SKU_NUMBER');
          $table->string('CATEGORY', 15)->after('ITEM_NAME');
          $table->integer('STOCK')->after('CATEGORY');
          $table->float('COST_PER_UNIT')->after('STOCK');
          $table->float('STOCK_VALUE')->after('COST_PER_UNIT');
          $table->string('STATUS')->after('STOCK_VALUE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inventory_management', function (Blueprint $table) {
            //
        });
    }
};
