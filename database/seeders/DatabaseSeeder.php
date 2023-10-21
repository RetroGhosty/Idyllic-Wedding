<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Shop;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        \App\Models\Product::factory(20)->create();
        \App\Models\User::factory(20)->create();
        \App\Models\User::factory()->create([
            "email" => "davilajohn810@gmail.com",
            "password"=> bcrypt("elaina181017"),
            "user_level" => 2,
         ]);
        $user = \App\Models\User::factory()->create([
            "email" => "johndavila810@gmail.com",
            "password"=> bcrypt("elaina181017"),
            "user_level" => 1,
         ]);

        

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
