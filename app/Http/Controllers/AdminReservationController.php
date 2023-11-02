<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminReservationController extends Controller
{
    public function viewReservation(){
        $reservations = DB::table('reservations')->where('status', "=", 'pending')->get();
        $payload = [
            'reservations' => $reservations,
        ];
        return Inertia::render("Dashboard", $payload);
    }
}
