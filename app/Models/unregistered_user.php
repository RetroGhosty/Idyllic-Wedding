<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Unregistered_user extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'phone_number',
        'first_name',
        'last_name',
    ];

    public function transactions(): HasMany {
        return $this->hasMany(Reservation_transaction::class);
    }
}
