<?php

namespace App\Models;

use App\Models\VenueShowcasePhoto;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'place_category',
        'theme_category',
    ];

    public function landing_photo(): HasOne{
        return $this->hasOne(VenueLandingPhoto::class);
    }
    
    public function showcase_photo(): HasMany{
        return $this->hasMany(VenueShowcasePhoto::class);
    }    

    public function place_category(): BelongsTo{
        return $this->belongsTo(PlaceCategory::class);
    }
    
    public function theme_category(): BelongsTo{
        return $this->belongsTo(ThemeCategory::class);
    }
}
