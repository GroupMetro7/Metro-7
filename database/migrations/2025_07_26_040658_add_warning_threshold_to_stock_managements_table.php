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
        Schema::table('stock_management', function (Blueprint $table) {
            $table->integer('warning_threshold')->default(5)->after('STOCK');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('stock_management', function (Blueprint $table) {
            $table->dropColumn('warning_threshold');
        });
    }
};
