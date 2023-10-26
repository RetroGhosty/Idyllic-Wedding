<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Shop;
use App\Models\venue;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VenueVendorController extends Controller
{
    public function index(){
        //code...
        if (auth()->user()->user_level == "vendor"){
            $venue = venue::where('venue_owner', auth()->user()->id)->get()->first();
            return Inertia::render("ShopVendor/Dashboard", ["venue"=> $venue]);
        } else{
            return abort(404, "Page not found");
        }
    }
    public function updateVenue(Request $request){
        $validatedData = $request->validate([
            "venue_id"=> "required|unique:venues",
        ]);
        $venue = venue::find($request->id);
        $venue->venue_name = $validatedData["venue_name"];
        $venue->save();
        return back();
    }

    public function createProduct(Request $request){
        $validated = $request->validate([
            'name' => 'required',
            'price' => 'numeric|min:0',
            'description' => 'required',
        ]);
        $venue = venue::find($request->venue_id);
        $fileHashName = $request->file("image")->hashName();
        $venue->venue_landing_photo()->create([
            "photo_url" => $request->file("image")->$fileHashName,
            "venue_id" => $venue->id,
        ]);
        
        if ($request->hasFile("image")) {
            Storage::putFileAs("public/venues/{$venue->id}/landing_photo", $request->file("image"), $fileHashName);
        };
        return back();
    }

   
}
