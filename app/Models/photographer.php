<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Photographer extends Model
{
    use HasFactory;
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'facebook_contact',
        'instagram_contact',
        'profile_picture',
    ];

    public function Reservation_transaction(): HasMany {
        return $this->hasMany(ReservationTransaction::class);
    }
}
