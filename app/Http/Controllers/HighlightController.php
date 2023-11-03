<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HighlightController extends Controller
{
    public function view(){
        return Inertia::render("Guest/Highlights");
    }
}
