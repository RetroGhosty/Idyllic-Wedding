<?php

namespace App\Http\Controllers;

use App\Models\Venue;
use App\Models\VenueShowcasePhoto;
use Illuminate\Http\Request;

class VenueShowcasePhotoController extends Controller
{
    public function delete(Request $request){
        $this->authorize('delete', auth()->user());
        $venue = Venue::find($request->venue_id);
        if ($venue == null) {
            return abort(404);
        };
        $showcasephoto = VenueShowcasePhoto::find($request->image_id);
        if ($showcasephoto == null) {
            return abort(404);
        };
        
        $localFilePath = public_path().'/storage/'.$showcasephoto->photo_url;
        if (file_exists($localFilePath)){
            unlink($localFilePath);
        }
        $showcasephoto->delete();
        
        return to_route("admin.venue.view", $venue->id);
    }
}
