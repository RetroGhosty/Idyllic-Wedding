<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class venue_showcase_photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'photo_url',
        'venue_id',
    ];

    public function venue(): BelongsTo {
        return $this->belongsTo(venue::class);
    }
}
