<?php

namespace App\Policies;

use App\choices\UserAccountLevel;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(?User $user): bool
    {
        return ($user->user_level == UserAccountLevel::ADMIN);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, $venue): bool
    {
        return $user->user_level == UserAccountLevel::ADMIN || (auth()->check() && $venue->venue_owner == auth()->user()->id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return ($user->user_level == UserAccountLevel::ADMIN);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return ($user->user_level == UserAccountLevel::ADMIN);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        return ($user->user_level == UserAccountLevel::ADMIN);
    }

    public function createVenue(User $user): bool
    {
        return ($user->user_level == UserAccountLevel::ADMIN || (auth()->check() && $user->user_level == UserAccountLevel::VENDOR));
    }

    public function updateVenue(User $user, $venue): bool
    {
        return ($user->user_level == UserAccountLevel::ADMIN || (auth()->check() && $venue->venue_owner == $user->id));
    }

    public function deleteVenue(User $user, $venue): bool
    {
        return ($user->user_level == UserAccountLevel::ADMIN || (auth()->check() && $venue->venue_owner == $user->id));
    }
}
