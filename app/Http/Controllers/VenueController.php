<?php

namespace App\Http\Controllers;

use App\Http\Requests\VenuePostRequest;
use App\Http\Requests\VenueRequest;
use App\Models\PlaceCategory;
use App\Models\ThemeCategory;
use App\Models\Venue;
use App\Models\VenueLandingPhoto;
use App\Models\VenueShowcasePhoto;
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


    
    public function createView(){
        $placeCategories = PlaceCategory::all();
        $themeCategories = ThemeCategory::all();
        $payload = [
            'placeCategories' => $placeCategories,
            'themeCategories' => $themeCategories
        ];
        return Inertia::render('Venue/VenueCreate', $payload);
    }

    public function post(VenuePostRequest $request)
    {
        $validated = $request->validated();
        $venue = Venue::create($validated);
        
        if (array_key_exists('header_image', $request->files->all())) {
            if (! Storage::putFile('public/venue/landing_images/'.$venue->id, $validated['header_image'])) {
                return abort(500, "Failed to upload header image");
            }
            $venueHeaderImage = VenueLandingPhoto::create([
                'venue_id' => $venue->id,
                'photo_url' => 'venue/landing_images/'.$venue->id.'/'.$validated['header_image']->hashName()
            ]);
            $venueHeaderImage->save();
        }
        if (array_key_exists('sub_images', $request->files->all())){
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
        return to_route("admin.dashboard", $venue->id)->with('success', 'Venue created successfully');
    }

    public function editView($venue_id)
    {
        $venue = Venue::find($venue_id);
        if ($venue == null){
            return to_route('notfound');
        }
        $serializedVenue = $venue->toArray();
        $header_image = $venue->landing_photo;
        $sub_images = $venue->showcase_photo;
        $placeCategories = PlaceCategory::all();
        $themeCategories = ThemeCategory::all();

        $currentPlaceCategory = PlaceCategory::find($venue->place_category);
        $currentThemeCategory = $themeCategories->find($venue->theme_category);

        $payload = [
            'venue' => $serializedVenue,
            'header_image' => $header_image,
            'showcase_image' => $sub_images,
            'placeCategories' => $placeCategories,
            'themeCategories' => $themeCategories,
            'currentPlaceCategory' => $currentPlaceCategory,
            'currentThemeCategory' => $currentThemeCategory

        ];
        return Inertia::render('Venue/VenueSettings', $payload);
    }


    public function edit(VenueRequest $request, $venue_id)
    {
        $venue = Venue::find($venue_id);
        $payload = [
            'venue' => $venue
        ];
        $validated = $request->validated();
        $venue->update();
        $venue->address = $request->address;
        if (array_key_exists('header_image', $request->files->all())) {
            if (! Storage::putFile('public/venue/landing_images/'.$venue->id, $validated['header_image'])) {
                return abort(500, "Failed to upload header image");
            }
            $venueHeaderImage = VenueLandingPhoto::create([
                'venue_id' => $venue->id,
                'photo_url' => 'venue/landing_images/'.$venue->id.'/'.$validated['header_image']->hashName()
            ]);
            $venueHeaderImage->save();
        }
        if (array_key_exists('sub_images', $request->files->all())){
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
        return to_route("admin.dashboard")->with("success", "Venue has been changed.");
        

    }


    public function delete($venue_id)
    {
        try {
            $venue = Venue::find($venue_id);
            if ($venue == null) {
                return abort(404, "Venue not found");
            }
            $venue->delete();
            return to_route('admin.dashboard')->with('success', 'Venue deleted successfully');
        } catch (\Throwable $th) {
            return to_route('admin.dashboard')->with('error', 'Something went wrong');
        }
    }
}