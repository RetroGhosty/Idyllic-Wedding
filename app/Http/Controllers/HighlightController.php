<?php

namespace App\Http\Controllers;

use App\Models\VenueShowcasePhoto;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HighlightController extends Controller
{
    public function view(){
        $highlightPhotos = VenueShowcasePhoto::all();
        $payload = [
            'highlightPhotos' => $highlightPhotos
        ];
        return Inertia::render("Guest/Highlights", $payload);


    }
}
