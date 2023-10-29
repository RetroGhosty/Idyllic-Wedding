<?php

namespace App\Http\Controllers;

use App\Http\Requests\VenueRequest;
use App\Models\User;
use App\Models\Venue;
use App\Models\VenueLandingPhoto;
use App\Models\VenueShowcasePhoto;
use App\Models\VenueShowcasePphoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VenueController extends Controller
{

    private function uploadFiles($file, $venue_id){
        foreach ($file as $key => $value) {
            if (!Storage::putFile('public/venue/subimages/'.$venue_id, $file[$key])) {
                return false;
            }
        }
        return true;
    }


    public function view($venue_id)
    {
        $venue = Venue::find($venue_id);
        $this->authorize('view', auth()->user());
        $payload = [
            'venue' => $venue
        ];
        return Inertia::render('Venue/VenueSettings', $payload);
}

    public function post(VenueRequest $request)
    {
        $this->authorize('create', auth()->user());
        $validated = $request->validated();
        $venue = Venue::create($validated);
        $venue->save();
        $venue->refresh();
        
        return to_route('admin.venue.view', ['venue_id' => $venue->id]);
    }

    public function edit(VenueRequest $request, $venue_id)
    {
        $this->authorize('update', auth()->user());
        $venue = Venue::find($venue_id);
        $payload = [
            'venue' => $venue
        ];
        $validated = $request->validated();
        $venue->update($validated);
        if (array_key_exists('header_image', $validated)) {
            if (! Storage::putFile('public/venue/landing_images/'.$venue->id, $validated['header_image'])) {
                return abort(500, "Failed to upload header image");
            }
            $venueHeaderImage = VenueLandingPhoto::create([
                'venue_id' => $venue->id,
                'photo_url' => 'venue/landing_images/'.$venue->id.'/'.$validated['header_image']->hashName()
            ]);
            $venueHeaderImage->save();
        }

        if (array_key_exists('sub_images', $validated)){
            if (!$this->uploadFiles($validated['sub_images'], $venue->id)) {
                return abort(500, "Failed to upload sub images");
            }
            foreach ($validated['sub_images'] as $key => $value) {
                $venueSubImage = VenueShowcasePhoto::create([
                    'venue_id' => $venue->id,
                    'photo_url' => 'venue/subimages/'.$venue->id.'/'.$value->hashName()
                ]);
                $venueSubImage->save();
            }
        }

        $venue->save();
        $venue->refresh();
        return to_route('admin.venue.view', ['venue_id' => $venue->id]);
    }

    public function delete($venue_id)
    {
        $venue = Venue::find($venue_id);
        if ($venue == null) {
            return abort(404, "Venue not found");
        }
        $venue->delete();
        return to_route('admin.dashboard');
    }
}
