<?php

namespace App\Http\Controllers;
use App\Models\Venue;
use App\Models\VenueLandingPhoto;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PublicVenueController extends Controller
{
    public function view(){
        $venues = DB::table('venues')
                    ->join('venue_landing_photos', function(JoinClause $join){
                        $join->on('venues.id', '=', 'venue_landing_photos.venue_id');
                    })
                    ->get();
        $payload = [
            'venues' => $venues,
        ];
        return Inertia::render('Guest/Venues', $payload);
    }

    public function view_single($venue_name){
        $venue = DB::table('venues')->where('venue_name', '=', $venue_name)->first();
        if (!$venue){
            abort(404);
        }
        $venue = Venue::find($venue->id);
        $landing_photo = $venue->landing_photo;
        $showcase_photo = $venue->showcase_photo;
        $payload = [
            'venue' => $venue,
            'landing_photo' => $landing_photo,
            'showcase_photo' => $showcase_photo,
        ];
        return Inertia::render('Guest/EachVenue', $payload);
    }
}
