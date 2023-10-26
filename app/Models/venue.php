<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class venue extends Model
{
    use HasFactory;
    protected $fillable = [
        'venue_name',
        'address',
        'price',
        'venue_owner',
    ];

    public function venue_owner(): HasOne{
        return $this->hasOne(User::class);
    }
    
    public function venue_landing_photo(): HasOne{
        return $this->hasOne(venue_landing_photo::class);
    }
    
    public function venue_showcase_photo(): HasMany{
        return $this->hasMany(venue_showcase_photo::class);
    }
    
    public function reservation_transaction(): HasMany{
        return $this->hasMany(reservation_transaction::class);
    }
    
}
