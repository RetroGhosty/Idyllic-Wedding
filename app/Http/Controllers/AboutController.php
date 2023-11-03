<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class AboutController extends Controller
{
    public function about(){
        return Inertia::render("Guest/AboutUs");
    }
}
