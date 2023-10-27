<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Venue;
use Illuminate\Auth\Access\Response;

class VenuePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return ($user->user_level == "admin");
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function show(User $user, $venue): bool
    {
        return ($user->user_level == "admin" || (auth()->check() && $venue->venue_owner == $user->id));
    }
    
    
    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
        return ($user->user_level == "admin" || (auth()->check() && $user->user_level == "vendor"));
    }
    
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Venue $venue): bool
    {
        return ($user->user_level == "admin" || (auth()->check() && $venue->venue_owner == $user->id));
        //
    }
    
    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Venue $venue): bool
    {
        return ($user->user_level == "admin" || (auth()->check() && $venue->venue_owner == $user->id));
        //
    }

}
