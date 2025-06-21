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
        Schema::create('orders', function (Blueprint $table) {
        $table->id();
        $table->string('name')->nullable();
        $table->string('order_number')->unique();
        $table->decimal('unpaid_balance', 10, 2)->storedAs('`amount` - (`cashPayment` + `onlinePayment` + IFNULL(`discount`,0))');
        $table->decimal('cashPayment', 10, 2);
        $table->decimal('onlinePayment', 10, 2);
        $table->decimal('amount', 10, 2)->nullable();
        $table->string('option')->nullable();
        $table->decimal('discount', 10, 2)->nullable();
        $table->string('status')->default('pending');
        $table->string('reference_Number')->nullable();
        $table->decimal('downpayment', 10, 2)->nullable();
        $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
