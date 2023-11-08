<?php
namespace App\Http\Controllers;

use App\Http\Requests\UnregisteredUserRequest;
use App\Models\Reservation;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function view(Request $request){
        $venues = Venue::all('id', 'venue_name', 'limit', 'price');
        $reservations = DB::table('reservations')->where('status', '!=', 'cancelled')->get(['id', 'venue_id', 'event_date']);

        $payload = [
            'venues' => $venues,
            'session' => $request->session()->get('contact_info'),
            'reservations' => $reservations,
        ];
        return Inertia::render('Guest/Booking', $payload);
    }

    public function contactInfo(UnregisteredUserRequest $request){
        $request -> validated();
        $request -> session() -> put('contact_info', $request -> all());

    }

}
