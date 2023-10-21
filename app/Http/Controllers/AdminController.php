<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminProfileUserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminController extends Controller
{
    //
    public function index(){
        try {
            if (auth()->user()->user_level >= 2){
                $users = DB::table("users")->select('id', 'name', 'email', 'email_verified_at', 'user_level')->where("user_level", "<=", 1)->get();
                return Inertia::render("Admin/Dashboard", ["users" => $users]);
            } else{
                return Inertia::render("NotFound");
            }
        } catch (\Throwable $th) {
            return abort(500, "Something went wrong");
        }
    }

    public function viewUser($user_id){
         try {
            
             $user = User::find($user_id);
             if ($user == null){
                 return inertia::render("Admin/UserAdminView", ["userdetails"=> $user]);
             }
             return inertia::render("Admin/UserAdminView", ["userdetails"=> $user]);
         
         } catch (\Throwable $th) {
 
             return abort(500, "Something went wrong");
         }
    }

    public function update(AdminProfileUserUpdateRequest $request, $user_id){

        $validatedData = $request->validated();
        $user = User::find($user_id);

 
        $user->name= $validatedData['name'];
        $user->email= $validatedData['email'];
        $user->user_level= $validatedData['user_level'];
        $user->save();
        
        return back();

    }
}
