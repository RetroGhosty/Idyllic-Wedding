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
        'transaction_amount', //pagkatapos ng success
        'payment_method', //pagkatapos ng success
        'customer_id', //kukunin
        'venue_id', //kukunin
        'event_date', // kukunin
        'transaction_status', //pagkatapos ng success
    ];

    public function customer(): HasOne{
        return $this->hasOne(UnregisteredUser::class, 'id', 'customer_id');
    }
    public function venue(): HasOne{
        return $this->hasOne(Venue::class, 'id', 'venue_id');
    }

}
