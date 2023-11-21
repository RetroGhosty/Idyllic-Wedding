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
        'transaction_amount',
        'paymongo_session_id',
        'payment_id',
        'payment_method',
        'customer_id', 
        'venue_id', 
        'event_date',
        'transaction_status', 
    ];

    public function customer(): HasOne{
        return $this->hasOne(UnregisteredUser::class, 'id', 'customer_id');
    }
    public function venue(): HasOne{
        return $this->hasOne(Venue::class, 'id', 'venue_id');
    }

    public function refund(): HasOne{
        return $this->hasOne(Refund::class, 'id');
    }
}
