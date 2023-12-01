<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminProfileUserUpdateRequest;
use App\Models\UnregisteredUser;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\choices\TransactionStatusEnum;
use App\Models\PlaceCategory;
use App\Models\ThemeCategory;

class AdminController extends Controller
{
    public function index(){
        $venues = Venue::all();
        $customers = UnregisteredUser::all();
        $transactions = DB::table('transactions')->where('transaction_status', "=", TransactionStatusEnum::PAID)->get();
        $refundRequests = DB::table('transactions')->where('transaction_status', "=", TransactionStatusEnum::PENDING_REFUND)->get();
        $place_categories = PlaceCategory::all();
        $theme_categories = ThemeCategory::all();
        $payload = [
            'transactions' => $transactions,
            'refundRequests' => $refundRequests,
            "venues" => $venues,
            'success' => session('success'),
            'error' => session('error'),
            'customers' => $customers,
            'place_categories' => $place_categories,
            'theme_categories' => $theme_categories
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
