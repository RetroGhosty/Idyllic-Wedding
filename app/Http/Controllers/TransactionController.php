<?php

namespace App\Http\Controllers;

use App\choices\TransactionStatusEnum;
use App\Models\Transaction;
use Illuminate\Http\Request;

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
}
