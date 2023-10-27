<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Venue>
 */
class VenueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'venue_name' => fake()->name(),
            'address'=> fake()->address(),
            'price' => fake()->numberBetween(1000, 5000),
            'Venue_owner' => fake()->unique()->numberBetween(1, 10),
            'iS_active' => fake()->boolean(),
            //
        ];
    }
}
