<?php

namespace App\Http\Controllers;

use App\choices\UserAccountLevel;
use App\Http\Middleware\DoesSuperAdminExist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SuperAdminController extends Controller
{

    private function doesSuperAdminExist(){
        if (User::where('user_level', UserAccountLevel::SUPERADMIN)->count() > 0){
            abort(404);
        } else{
            return false;
        }
    }

    public function makeSuperAdminView(){
        $this->doesSuperAdminExist();
        return Inertia::render('SuperAdmin/CreateSuperAdminView');
    }

    public function editUserView(Request $request, $user_id){
        $payload = [
            'user' => User::find($user_id),
        ];
        return Inertia::render('SuperAdmin/ChangeUserDetails', $payload);
    }

    public function editUser(Request $request){
        $validatedRequest = $request->validate([
            'id' => 'required',
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required',
            'user_level' => 'required',
        ]);
        $fetchedUser = User::find($validatedRequest['id']);
        $fetchedUser->update([
            'first_name' => $validatedRequest['first_name'],
            'last_name' => $validatedRequest['last_name'],
            'email' => $validatedRequest['email'],
            'user_level' => $validatedRequest['user_level'],
        ]);
        $fetchedUser->save();
        return to_route('superadmin.view')->with('success', 'Successfully updated user details!');
    }

    public function makeSuperAdmin(){
        $this->doesSuperAdminExist();
        $authUser = auth()->user();
        $fetchedUserRole = User::find($authUser->id);
        $fetchedUserRole->user_level = UserAccountLevel::SUPERADMIN;
        $fetchedUserRole->save();
        return to_route('dashboard')->with('success', 'Successfully claimed super admin privileges!');
    }

    public function viewSuperAdminPanel(){
        $payload = [
            'users' => DB::table('users')->where('user_level', '!=', UserAccountLevel::SUPERADMIN)->get(),
            'success' => session('success'),
        ];
        return Inertia::render('SuperAdmin/SuperAdminPanel', $payload);
    }

    public function deleteBatch(Request $request){
        $validatedData = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer',
        ]);
        $ids = $validatedData['ids'];
        $users = User::find($ids);
        foreach($users as $user){
            $user->delete();
        }

        return back()->with('success', 'Users has been deleted successfully');
    }
}
