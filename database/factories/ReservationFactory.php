<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\choices\PaymentMethodEnum;

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
            'total_price' => fake()->numberBetween(1000, 10000),
            'event_date' => fake()->date(),
            'payment_method' => fake()->randomElement([PaymentMethodEnum::GCASH, PaymentMethodEnum::COD, PaymentMethodEnum::PAYMAYA]),
            'status' => fake()->randomElement(['pending']),
        ];
    }
}
