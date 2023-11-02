<?php

namespace App\Http\Controllers;

use App\choices\ReservationStatusEnum;
use App\Models\Reservation;
use App\Models\Transaction;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function editStatus(Request $request, $reservation_id){
        $this->authorize('update', auth()->user());

        $reservation = Reservation::find($reservation_id);

        if ($request->status == ReservationStatusEnum::APPROVED->value){
            $reservation->status = ReservationStatusEnum::APPROVED;
            $reservation->save();
            Transaction::create([
                'customer_id' => $reservation->customer_id,
                'venue_id' => $reservation->venue_id,
                'photo_id' => $reservation->photo_id,
                'reservation_id' => $reservation->id,
                'photographer_id' => $reservation->photographer_id,
                'transaction_amount' => $reservation->total_price,
                'transaction_status' => ReservationStatusEnum::APPROVED,
                'payment_method' => $reservation->payment_method,
            ]);
        }
        $reservation->refresh();
        return to_route('dashboard');
    }
}
