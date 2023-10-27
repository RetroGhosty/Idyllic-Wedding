<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Shop;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use App\choices\UserAccountLevel;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(20)->create();
        \App\Models\User::factory()->create([
            "email" => "davilajohn810@gmail.com",
            "password"=> bcrypt("123"),
            "user_level" => UserAccountLevel::ADMIN,
         ]);

         \App\Models\Venue::factory(10)->create();
         \App\Models\Photographer::factory(10)->create();
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
