<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\choices\PaymentMethodEnum;

class Reservation extends Model
{
    use HasFactory, HasUlids;
    protected $fillable = [
        'venue_id',
        'customer_id',
        'venue_id',
        'total_price',
        'event_date',
        'status',
        'payment_method',
        'payment_proof'
    ];

    /**
     * The attributes that should be cast.
     * @var array
     */
    protected $casts = [
        'payment_method'=> PaymentMethodEnum::class,
    ];
}
