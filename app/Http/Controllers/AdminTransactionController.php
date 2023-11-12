<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminTransactionController extends Controller
{
    public function viewReservation(){
        $transactions = DB::table('transactions')->where('transaction_status', "=", 'paid')->get();
        $payload = [
            'transactions' => $transactions,
        ];
        return Inertia::render("Dashboard", $payload);
    }
}
