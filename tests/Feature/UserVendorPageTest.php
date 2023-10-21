<?php

namespace Tests\Feature;

use Carbon\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Testing\Fakes\Fake;
use Illuminate\Testing\Assert;

class UserVendorPageTest extends TestCase
{

    use RefreshDatabase;

    public function test_vendor_user_should_return_200_at_store_dashboard_page(): void{
        $user = User::factory()->create([
            "user_level" => "1"
        ]);
        $response = $this->actingAs($user)->get(route("shopvendor.dashboard"))->assertStatus(200);
        $response = $this->actingAs($user)->get("/shop")->assertStatus(200);
    
        $response = $this->actingAs($user)->get(route("dashboard"))->assertStatus(200);
    }

    public function test_user_vendor_should_return_403_admin_pages(): void
    {
        $vendorUser = User::factory()->create([
            "password" => bcrypt("password"),
            "user_level" => 1
        ]);

        $normalUser = User::factory()->create([
            "user_level" => 0
        ]);
        $payload = [
            "user_id"=>$normalUser->id
        ];
        $response = $this->actingAs($vendorUser)->get(route("admin.dashboard"))->assertNotFound();
        $response = $this->actingAs($vendorUser)->get(route("admin.user.view", $payload))->assertNotFound();
    }

    public function test_user_vendor_should_not_be_able_to_modify_users(): void
    {
        $vendorUser = User::factory()->create([
            "user_level" => 1
        ]);

        $normalUser = User::factory()->create([]);
        $payload = [
            "name" => "testname",
            "email" => "test@gmail.com",
            "user_level" => "1"
        ];
        $vendorUser = $this->actingAs($vendorUser)->patch(route("admin.user.update", $normalUser->id), $payload)->assertForbidden();  
    }
}
