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
        })->join('theme_categories', function(JoinClause $join){
            $join->on('venues.theme_category', '=', 'theme_categories.id');
        })->join('place_categories', function(JoinClause $join){
            $join->on('venues.place_category', '=', 'place_categories.id');
        })->select('venues.*', 'venue_landing_photos.photo_url', 'theme_categories.name as theme_name', 'theme_categories.image as theme_cover', 'place_categories.name as place_name')
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
