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
        Schema::create('transactions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignId('customer_id')->nullable()->constrained('Unregistered_users', 'id')->onDelete('SET NULL');
            $table->foreignId('venue_id')->nullable()->constrained('Venues', 'id')->onDelete('SET NULL');
            $table->foreignId('photographer_id')->nullable()->constrained('Photographers', 'id')->onDelete('SET NULL');
            $table->foreignUlid('reservation_id')->nullable()->constrained('Reservations', 'id')->onDelete('SET NULL');
            $table->integer('transaction_amount');
            $table->string('transaction_status');
            $table->string('payment_method');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
