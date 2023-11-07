<?php
namespace App\Http\Controllers;

use App\Http\Requests\UnregisteredUserRequest;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function view(Request $request){
        $venues = Venue::all('id', 'venue_name', 'limit', 'price');
        $payload = [
            'venues' => $venues,
        ];
        return Inertia::render('Guest/Booking', $payload);
    }

    public function contactInfo(UnregisteredUserRequest $request){
        $request -> validated();
        
    }

}
