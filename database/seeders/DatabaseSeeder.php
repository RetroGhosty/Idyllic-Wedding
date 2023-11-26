<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Shop;
use Illuminate\Database\Seeder;
use App\choices\UserAccountLevel;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory()->create([
        //     "email" => "carolineseptimo67@gmail.com",
        //     "password"=> bcrypt("gggg"),
        //     "user_level" => UserAccountLevel::ADMIN,
        // ]);
        // \App\Models\User::factory()->create([
        //     "email" => "davilajohn810@gmail.com",
        //     "password"=> bcrypt("123"),
        //     "user_level" => UserAccountLevel::ADMIN,
        // ]);
        // \App\Models\User::factory()->create([
        //     "email" => "jerichomorales81@gmail.com",
        //     "password"=> bcrypt("test123"),
        //     "user_level" => UserAccountLevel::ADMIN,
        // ]);

        
        \App\Models\UnregisteredUser::factory(100)->create();
        // \App\Models\Transaction::factory(10)->create();

    }
}
