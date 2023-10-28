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
            'description' => fake()->text(),
            'limit' => fake()->numberBetween(20, 200),
            'price' => fake()->numberBetween(1000, 5000),
            //
        ];
    }
}
