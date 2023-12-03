<?php

namespace App\Http\Controllers;

use App\choices\UserAccountLevel;
use App\Http\Middleware\DoesSuperAdminExist;
use App\Models\User;
use Illuminate\Http\Request;
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
            'users' => User::all(),
        ];
        return Inertia::render('SuperAdmin/SuperAdminPanel', $payload);
    }
}
