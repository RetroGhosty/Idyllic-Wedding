<?php

namespace App\Http\Controllers;

use App\Http\Requests\PhotographerRequest;
use App\Models\Photographer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PhotographerController extends Controller
{
    public function view($photographer_id){
        $photographer = Photographer::find($photographer_id);
        return Inertia::render("Photographer/PhotographerView", ["photographer" => $photographer]);

    }

    public function update(PhotographerRequest $request, $photographer_id){
        $photographer = Photographer::find($photographer_id);
        if ($photographer == null){
            return abort(404, "Photographer not found");
        }
        $validatedData = $request->validated();
        $photographer->update($validatedData);
        $photographer->save();
        $photographer->refresh();
        return back()->with('success', 'Photographer deleted successfully');
    }
    
    public function delete($photographer_id){
        $photographer = Photographer::find($photographer_id);
        if ($photographer == null){
            return abort(404, "Photographer not found");
        }
        $photographer->delete();
        return back()->with('success', 'Photographer deleted successfully');
    }
}
