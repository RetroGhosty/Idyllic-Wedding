<?php

namespace App\Http\Controllers;

use App\Http\Requests\UnregisteredUserRequest;
use App\Models\UnregisteredUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnregisteredUserController extends Controller
{
    public function viewCustomer(Request $request, $customer_id){
        $customer = UnregisteredUser::find($customer_id);
        if ($customer == null) {
            return abort(404);
        }
        $payload = [
            'customer' => $customer,
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error')
        ];
        return Inertia::render('Admin/CustomerInfoView', $payload);
    }

    public function editCustomer(UnregisteredUserRequest $request, $customer_id){
        $customer = UnregisteredUser::find($customer_id);
        if ($customer == null) {
            return abort(404);
        }
        $validatedRequest = $request->validated();
        $customer->update($validatedRequest);
        $customer->save();
        $customer->refresh();
        $payload = [
            'customers' => $customer
        ];
        return back()->with('success', 'Customer '. '['.$customer->id.'] '. $customer->fullName.' has been updated successfully');
    }



    public function deleteBatch(Request $request){
        $validatedData = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer',
        ]);
        $ids = $validatedData['ids'];
        $customers = UnregisteredUser::find($ids);
        foreach($customers as $customer){
            $customer->delete();
        }

        return back()->with('success', 'Customer has been deleted successfully');
    }


}
