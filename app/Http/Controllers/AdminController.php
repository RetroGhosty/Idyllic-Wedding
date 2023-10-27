<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminProfileUserUpdateRequest;
use App\Models\Photographer;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    //
    public function index(){
        $users = DB::table("users")->select('id', 'first_name', 'last_name', 'email', 'email_verified_at', 'user_level', 'status')->where("user_level", "!=", "admin")->get();
        $venues = Venue::all();
        $Photographers = Photographer::all();
        $payload = [
            "users" => $users,
            "venues" => $venues,
            "Photographers" => $Photographers
        ];
        return Inertia::render("Admin/Dashboard", $payload);
    }
    
    public function viewUser($user_id){
        $user = User::find($user_id);
        return inertia::render("Admin/UserAdminView", ["userdetails"=> $user]);

    }
    public function update(AdminProfileUserUpdateRequest $request, $user_id){
        $validatedData = $request->validated();
        $user = User::find($user_id);
        if ($user == null){
            return abort(404, "User not found");
        }
        $user->update($validatedData);
        $user->save();
        return to_route('admin.user.view', ['user_id' => $user->id]);
    }


    
}
