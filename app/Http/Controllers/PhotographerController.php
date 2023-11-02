<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhotographerEditRequest;
use App\Http\Requests\PhotographerRequest;
use App\Models\Photographer;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PhotographerController extends Controller
{
    public function view($photographer_id){
        $photographer = Photographer::find($photographer_id);
        if ($photographer == null){
            return to_route('notfound');
        }
        return Inertia::render("Photographer/PhotographerView", ["photographer" => $photographer]);
    }

    public function createView(){
        return Inertia::render("Photographer/PhotographerCreateView");
    }

    public function createPhotographer(PhotographerRequest $request){
        $validated = $request->validated();
        $photographer = Photographer::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'phone_number' => $request->phone_number,
            'email' => $request->email,
            'facebook_contact' => $request->facebook_contact,
            'instagram_contact' => $request->instagram_contact,
            'profile_picture' => 'photographers/profile/'.$validated['profile_picture']->hashName()
        ]);

        $photographer->save();
        if (! Storage::putFile('public/photographers/profile/', $validated['profile_picture'])) {
            return abort(500, "Failed to upload profile picture");
        }
        $photographer->refresh();
        return to_route('admin.dashboard');
    }

    public function update(PhotographerEditRequest $request, $photographer_id){
        $validatedData = $request->validated();
        $photographer = Photographer::find($photographer_id);
        if ($photographer == null){
            return abort(404, "Photographer not found");
        }
        if (array_key_exists('profile_picture', $validatedData)){
            if (! Storage::putFileAs('public/photographers/profile/', $validatedData['profile_picture'], $validatedData['profile_picture']->hashName())) {
                return abort(500, "Failed to upload profile picture");
            }
            $localFilePath = public_path().'/storage/'.$photographer->profile_picture;
            if ($photographer->profile_picture != null){
                if (file_exists($localFilePath)){
                    unlink($localFilePath);
                }
            }
            $photographer->profile_picture = 'photographers/profile/'.$validatedData['profile_picture']->hashName();
        }

        $photographer->update();
        $photographer->save();
        $photographer->refresh();
        return back()->with('success', 'Photographer updated successfully');
    }
    
    public function delete($photographer_id){
        $photographer = Photographer::find($photographer_id);
        if ($photographer == null){
            return abort(404, "Photographer not found");
        }
        $localFilePath = public_path().'/storage/'.$photographer->profile_picture;
        if ($photographer->profile_picture != null){
            if (file_exists($localFilePath)){
                unlink($localFilePath);
            }
        }

        $photographer->delete();
        return back()->with('success', 'Photographer deleted successfully');
    }
}
