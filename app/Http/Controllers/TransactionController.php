<?php

namespace App\Http\Controllers;

use App\choices\TransactionStatusEnum;
use App\Models\Transaction;
use App\Models\UnregisteredUser;
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

    public function viewTransaction($transaction_id){
        $transaction = Transaction::find($transaction_id);
        if ($transaction == null){
            return abort(404);
        }
        $bookedBy = $transaction->customer;
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
                'customer' => DB::table('unregistered_users')->where('id', $transaction->customer_id)->first(['email', 'phone_number', 'first_name', 'last_name', 'id']),
                'paymentDetails' => $paymentDetails,
            ];
            return Inertia::render('Admin/TransactionView', $payload);
        } catch (\Throwable $th) {
            return abort(500);
        }

    }
}
