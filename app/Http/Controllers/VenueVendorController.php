<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Venue;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VenueVendorController extends Controller
{
    public function index(){
        //code...
        if (auth()->user()->user_level == "vendor"){
            $Venue = Venue::where('Venue_owner', auth()->user()->id)->get()->first();
            return Inertia::render("ShopVendor/Dashboard", ["Venue"=> $Venue]);
        } else{
            return abort(404, "Page not found");
        }
    }
    public function updateVenue(Request $request){
        $validatedData = $request->validate([
            "Venue_id"=> "required|unique:Venues",
        ]);
        $Venue = Venue::find($request->id);
        $Venue->venue_name = $validatedData["venue_name"];
        $Venue->save();
        return back();
    }

    public function createProduct(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'numeric|min:0',
            'description' => 'required',
        ]);
        $Venue = Venue::find($request->Venue_id);
        $fileHashName = $request->file("image")->hashName();
        $Venue->Venue_landing_photo()->create([
            "photo_url" => $request->file("image")->$fileHashName,
            "Venue_id" => $Venue->id,
        ]);
        
        if ($request->hasFile("image")) {
            Storage::putFileAs("public/Venues/{$Venue->id}/landing_photo", $request->file("image"), $fileHashName);
        };
        return back();
    }

   
}
