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
        Schema::create('reservation_transactions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->foreignId('registered_user')->nullable()->constrained('users', 'id');
            $table->foreignId('unregistered_user')->nullable()->constrained('unregistered_users', 'id');
            $table->foreignId('venue_id')->constrained('venues', 'id');
            $table->foreignId('photographer_id')->constrained('photographers', 'id');
            $table->integer('total_price');
            $table->date('event_on');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservation_transactions');
    }
};
