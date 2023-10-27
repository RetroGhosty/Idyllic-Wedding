<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class VenueShowcasePphoto extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo_url',
        'Venue_id',
    ];

    public function Venue(): BelongsTo {
        return $this->belongsTo(Venue::class);
    }
}
