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
        $venues = Venue::all();
        $photographers = Photographer::all();
        $payload = [
            "venues" => $venues,
            "photographers" => $photographers
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

    public function delete($user_id){
        $user = User::find($user_id);
        if ($user == null){
            return abort(404, "User not found");
        }
        $user->delete();
        return to_route('admin.dashboard');
    }

    
}
