<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function view(){
        return Inertia::render('Guest/Booking');
    }
}
