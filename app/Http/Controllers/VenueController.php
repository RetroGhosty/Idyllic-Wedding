<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Venue;
use Inertia\Inertia;

class VenueController extends Controller
{
    public function view($venue_id)
    {
        $venue = Venue::find($venue_id);
        $user = $venue->owner;
        $this->authorize('view', [$user, $venue]);
        $payload = [
            'venue' => $venue
        ];
        return Inertia::render('Venue/VenueSettings', $payload);
    }

    public function edit($venue_id)
    {
        $venue = Venue::find($venue_id);
        $payload = [
            'venue' => $venue
        ];
        $validate = request()->validate([
            'venue_name' => 'required',
            'address' => 'required',
            'price' => 'numeric|required|min:0',
        ]);

        $venue->update($validate);
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
