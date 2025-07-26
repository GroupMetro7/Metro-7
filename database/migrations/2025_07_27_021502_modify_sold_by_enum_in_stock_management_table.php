<?php

use App\Models\StockManagement;
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
        Schema::table('stock_management', function (Blueprint $table) {
            $table->enum('SOLD_BY', ['each', 'weight', 'g', 'ml'])->default('each')->change();
        });

        StockManagement::where('SOLD_BY', 'weight')->update(['SOLD_BY' => 'g']);

        Schema::table('stock_management', function (Blueprint $table) {
            $table->enum('SOLD_BY', ['each', 'g', 'ml'])->default('each')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stock_management', function (Blueprint $table) {
            $table->enum('SOLD_BY', ['each', 'weight', 'g', 'ml'])->default('each')->change();
        });

        StockManagement::whereIn('SOLD_BY', ['g', 'ml'])->update(['SOLD_BY' => 'weight']);

        Schema::table('stock_management', function (Blueprint $table) {
            $table->enum('SOLD_BY', ['each', 'weight'])->default('each')->change();
        });
    }
};
