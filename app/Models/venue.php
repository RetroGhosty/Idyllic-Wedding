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
        'address',
        'price',
        'venue_owner',
    ];

    public function owner(): HasOne{
        return $this->hasOne(User::class, 'id', 'venue_owner');
    }
    
    public function landing_photo(): HasOne{
        return $this->hasOne(Venue_landing_photo::class);
    }
    
    public function showcase_photo(): HasMany{
        return $this->hasMany(Venue_landing_photo::class);
    }
    
    public function transaction(): HasMany{
        return $this->hasMany(Venue_landing_photo::class);
    }
    
}
