<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminProfileUserUpdateRequest;
use App\Models\Shop;
use App\Models\User;
use App\Models\venue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    //
    public function index(){
        if (auth()->user()->user_level == "admin"){
            $users = DB::table("users")->select('id', 'first_name', 'last_name', 'email', 'email_verified_at', 'user_level')->where("user_level", "!=", "admin")->get();
            return Inertia::render("Admin/Dashboard", ["users" => $users]);
        } 
        return abort(404, "Page not found");
    }
    
    public function viewUser($user_id){
        $user = User::find($user_id);
        if (!auth()->user()->user_level == "admin"){
            return abort(404, "Page not found");
        } 
        if ($user == null){
            return abort(404, "Page not found");
        }
        return inertia::render("Admin/UserAdminView", ["userdetails"=> $user]);

    }
    
    public function update(AdminProfileUserUpdateRequest $request, $user_id){
        $validatedData = $request->validated();
        $user = User::find($user_id);
        if ($user == null){
            return abort(404, "User not found");
        }
        $user->name= $validatedData['name'];
        $user->email= $validatedData['email'];
        $user->user_level= $validatedData['user_level'];
        $user->save();
        $isShopCreated = $this->createStoreForVendor($user->id);
        if ($isShopCreated == true){
            return back();
        } else{
            return abort(500, 'Something went wrong');
        }
    }
}
