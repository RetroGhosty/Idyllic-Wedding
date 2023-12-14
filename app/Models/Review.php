<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Review extends Model
{
    use HasFactory;
    protected $filled = [
        'description',
        'customer_id',
        'venue_id'
    ];

    public function venues(): HasOne{
        return $this->hasOne(Venue::class, 'id', 'venue_id');
    }

    public function customer(){
        return $this->hasOne(UnregisteredUser::class, 'id', 'customer_id');
    }

}
