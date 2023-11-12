<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UnregisteredUser extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'phone_number',
        'first_name',
        'last_name',
    ];

    public function transaction(): HasMany {
        return $this->hasMany(Transaction::class, 'customer_id');
    }
}
