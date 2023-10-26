<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OurvenueController extends Controller
{
    public function venue(){
        return Inertia::render("Guest/OurVenue");
    }
}
