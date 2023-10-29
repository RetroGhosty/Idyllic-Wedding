<?php

namespace App\Http\Controllers;

use App\Http\Requests\VenueRequest;
use App\Models\User;
use App\Models\Venue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VenueController extends Controller
{
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
        dd($validated);
        $venue->update($validated);
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
