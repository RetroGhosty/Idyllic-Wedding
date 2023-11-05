<?php
namespace App\Http\Controllers;
use App\Models\Venue;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function view(){
        $venues = Venue::all('id', 'venue_name', 'limit', 'price');
        $payload = [
            'venues' => $venues,
        ];
        return Inertia::render('Guest/Booking', $payload);
    }
}
