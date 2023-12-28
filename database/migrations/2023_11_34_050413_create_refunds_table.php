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
        Schema::create('refunds', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignUlid('transaction_id')->nullable()->constrained('transactions', 'id')->onDelete('SET NULL');
            $table->foreignId('customer_id')->nullable()->constrained('unregistered_users', 'id')->onDelete('SET NULL');
            $table->string('refund_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refunds');
    }
};
