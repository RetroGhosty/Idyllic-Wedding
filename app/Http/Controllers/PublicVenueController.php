<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

class PublicVenueController extends Controller
{
    public function view(){
        return Inertia::render('Guest/Venues');
    }
}
