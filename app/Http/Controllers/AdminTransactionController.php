<?php

namespace App\Http\Controllers;

use App\choices\TransactionStatusEnum;
use App\Models\Refund;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Luigel\Paymongo\Facades\Paymongo;

class AdminTransactionController extends Controller
{
    public function viewReservation(){
        $transactions = DB::table('transactions')->where('transaction_status', "=", TransactionStatusEnum::PAID)->get();
        $refundRequests = DB::table('transactions')->where('transaction_status', "=", TransactionStatusEnum::PENDING_REFUND)->get();
        $payload = [
            'transactions' => $transactions,
            'refundRequests' => $refundRequests,
        ];
        return Inertia::render("Dashboard", $payload);
    }

    public function requestRefund(Request $request, $transaction_id){
        $transaction = Transaction::find($transaction_id);
        $paymongoPaymentId = $transaction->payment_id;
        $refundedAmount = $transaction->transaction_amount - $transaction->transaction_amount * 0.05;
        try {
            $refund = Paymongo::refund()->create([
                'amount' => $refundedAmount,
                'notes' => 'Refund for transaction ' . $transaction_id,
                'payment_id' => $paymongoPaymentId,
                'reason' => \Luigel\Paymongo\Models\Refund::REASON_REQUESTED_BY_CUSTOMER,
        ]);
            $transaction->transaction_status = TransactionStatusEnum::PENDING_REFUND;
            $transaction->save();

            $refund = Refund::create([
                'transaction_id' => $transaction_id,
                'customer_id' => $transaction->customer_id,
                'refund_id' => $refund->id,
            ]);
            $refund->save();
            return redirect()->back()->with('success', 'Refund request sent!');
        } catch (\Throwable $th) {
            $transaction->transaction_status = TransactionStatusEnum::PENDING_REFUND;
            $transaction->save();
            $refund = Refund::create([
                'transaction_id' => $transaction_id,
                'customer_id' => $transaction->customer_id,
                'refund_id' => $refund->id,
            ]);
            $refund->save();
            return redirect()->back()->with('error', 'Something went wrong!');
        }
    }

    public function viewRefundInfo($transaction_id){
        $transaction = Transaction::find($transaction_id);
        if ($transaction == null){
            return abort(404);
        }
        if ($transaction->transaction_status == TransactionStatusEnum::PENDING_REFUND || $transaction->transaction_status == TransactionStatusEnum::REFUNDED){
            return to_route('dashboard');
        }
        if ($transaction->payment_id == null){
            return abort(404);
        }

        try {
            //code...
            $refund = Paymongo::refund()->find(Refund::where('transaction_id', $transaction_id)->first()->refund_id);
    
            $refundDetails = [
                'id' => $refund->id,
                'amount' => $refund->amount,
                'reason' => $refund->reason,
                'status' => $refund->status,
                'available_at' => $refund->available_at,
                'created_at' => $refund->created_at,
                'updated_at' => $refund->updated_at,
                'refunded_at' => $refund->refunded_at,
            ];
            $payload = [
                'transaction' => $transaction,
                'refund' => $refundDetails,
            ];
            return Inertia::render("Admin/TransactionRefund", $payload);
        } catch (\Throwable $th) {
            return abort(500);
        }
        
    }

}