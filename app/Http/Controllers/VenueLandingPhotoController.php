<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use App\Models\VenueLandingPhoto;
use Illuminate\Http\Request;

class VenueLandingPhotoController extends Controller
{
    public function delete(Request $request){
        $this->authorize('delete', auth()->user());
        $venue = Venue::find($request->venue_id);
        if ($venue == null) {
            return abort(404);
        };
        $landingphoto = VenueLandingPhoto::find($request->image_id);
        if ($landingphoto == null) {
            return abort(404);
        };
        
        $localFilePath = public_path().'/storage/'.$landingphoto->photo_url;
        if (file_exists($localFilePath)){
            unlink($localFilePath);
        }
        $landingphoto->delete();
        
        return to_route("admin.venue.view", $venue->id);
    }
}
