<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => fake()->numberBetween(1, 10),
            'venue_id' => fake()->numberBetween(1, 10),
            'photographer_id' => fake()->numberBetween(1, 10),
            'total_price' => fake()->numberBetween(1000, 10000),
            'event_date' => fake()->date(),
            'status' => fake()->randomElement(['pending', 'approved', 'rejected', 'cancelled']),
        ];
    }
}
