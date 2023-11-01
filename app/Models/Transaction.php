<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Transaction extends Model
{
    use HasFactory, HasUlids;
    protected $fillable = [
        'customer_id',
        'venue_id',
        'photographer_id',
        'reservation_id',
        'transaction_amount',
        'transaction_status',
        'payment_method',
    ];

    public function customer(): HasOne{
        return $this->hasOne(UnregisteredUser::class, 'id', 'customer_id');
    }
    public function venue(): HasOne{
        return $this->hasOne(Venue::class, 'id', 'venue_id');
    }
    public function photographer(): HasOne{
        return $this->hasOne(Photographer::class, 'id', 'photographer_id');
    }
    public function reservation(): HasOne{
        return $this->hasOne(Reservation::class, 'id', 'reservation_id');
    }
}
