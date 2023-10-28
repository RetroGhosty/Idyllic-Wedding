<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Venue extends Model
{
    use HasFactory;
    protected $fillable = [
        'venue_name',
        'description',
        'limit',
        'price',
    ];

    public function landing_photo(): HasOne{
        return $this->hasOne(VenueLandingPhoto::class);
    }
    
    public function showcase_photo(): HasMany{
        return $this->hasMany(VenueShowcasePphoto::class);
    }
    
    public function photographers(): HasMany{
        return $this->hasMany(Photographer::class);
    }

    public function available_reservation(): HasMany{
        return $this->hasMany(Reservation::class);
    }
    
}
