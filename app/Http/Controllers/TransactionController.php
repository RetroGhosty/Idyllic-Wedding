<?php

namespace App\Http\Controllers;

use App\choices\TransactionStatusEnum;
use App\Http\Requests\BookingPaymentSessionRequest;
use App\Models\Transaction;
use App\Models\UnregisteredUser;
use App\Models\Venue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Luigel\Paymongo\Facades\Paymongo;
class TransactionController extends Controller
{
    public function editStatus(Request $request, $transaction_id){
        $this->authorize('update', auth()->user());

        $transaction = Transaction::find($transaction_id);

        if ($request->status == TransactionStatusEnum::APPROVED->value){
            $transaction->update([
                'status_status'=> TransactionStatusEnum::APPROVED->value
            ]);
            $transaction->save();
        }
        if ($request->status == TransactionStatusEnum::CANCELLED->value){
            $transaction->transaction_status = TransactionStatusEnum::CANCELLED;
            $transaction->save();
        }
        $transaction->refresh();
        return to_route('dashboard');
    }

    public function editVenueTransactionDetails(BookingPaymentSessionRequest $request, $transaction_id){
        $transaction = Transaction::find($transaction_id);
        $transaction->update($request->validated());
        $transaction->save();
        $transaction->refresh();
        return back()->with('success', 'Transaction details updated successfully');
    }

    public function viewTransaction($transaction_id){
        $transaction = Transaction::find($transaction_id);
        if ($transaction == null){
            return abort(404);
        }
        $allTransaction = Transaction::all();
        $allVenue = Venue::all();

        $venue = Venue::find($transaction->venue->id)->first(['id', 'venue_name', 'limit', 'price', 'description']);
        try {
            $payment = Paymongo::payment()->find($transaction->payment_id);
            $paymentDetails = [
                'paymongoPaymentId' => $payment->id,
                'amount' => $payment->amount,
                'billingEmail' => $payment->billing['email'],
                'billingName' => $payment->billing['name'],
                'billingPhone' => $payment->billing['phone'],
                'netAmount' => $payment->net_amount,
                'status' => $payment->status,
                'fee' => $payment->status
            ];
            $payload = [
                'transaction' => $transaction,
                'allTransaction' => $allTransaction,
                'venue' => $venue,
                'allVenue' => $allVenue,
                'customer' => DB::table('unregistered_users')->where('id', $transaction->customer_id)->first(['email', 'phone_number', 'first_name', 'last_name', 'id']),
                'paymentDetails' => $paymentDetails,
            ];
            return Inertia::render('Admin/TransactionView', $payload);
        } catch (\Throwable $th) {
            $payload = [
                'transaction' => $transaction,
                'allTransaction' => $allTransaction,
                'venue' => $venue,
                'allVenue' => $allVenue,
                'customer' => DB::table('unregistered_users')->where('id', $transaction->customer_id)->first(['email', 'phone_number', 'first_name', 'last_name', 'id']),
            ];
            return Inertia::render('Admin/TransactionView', $payload);
        }

    }
}
