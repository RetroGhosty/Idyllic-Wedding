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
            $table->integer('transaction_amount')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('paymongo_session_id')->nullable();
            $table->string('payment_id')->nullable();
            $table->foreignId('customer_id')->nullable()->constrained('Unregistered_users', 'id')->onDelete('SET NULL');
            $table->foreignId('venue_id')->nullable()->constrained('Venues', 'id')->onDelete('SET NULL');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('transaction_status');
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
