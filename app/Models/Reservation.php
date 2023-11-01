<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory, HasUlids;
    protected $fillable = [
        'venue_id',
        'photographer_id',
        'customer_id',
        'payment_method',
        'reservation_date',
        'reservation_status',
        'reservation_price',
    ];

    
}
