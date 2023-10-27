<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OurVenueController extends Controller
{
    public function Venue(){
        return Inertia::render("Guest/OurVenue");
    }
}
