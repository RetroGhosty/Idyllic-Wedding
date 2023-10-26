<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class venue_landing_photo extends Model
{
    use HasFactory;
    protected $fillable = [
        'photo_url',
        'venue_id',
    ];

    public function venue(): HasOne {
        return $this->hasOne(venue::class);
    }

}
