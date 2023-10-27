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
            $table->foreignId('Unregistered_user')->nullable()->constrained('Unregistered_users', 'id');
            $table->foreignId('Venue_id')->constrained('Venues', 'id');
            $table->foreignId('Photographer_id')->constrained('Photographers', 'id');
            $table->integer('total_price');
            $table->date('event_on');
            $table->string('status')->default('pending');
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
