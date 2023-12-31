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

    protected $appends = [
        'fullName',
    ];

    public function transaction(): HasMany {
        return $this->hasMany(Transaction::class, 'customer_id');
    }

    public function refund(): HasMany {
        return $this->hasMany(Refund::class, 'customer_id');
    }

    public function getFullNameAttribute(): string {
        return $this->first_name . ' ' . $this->last_name;
    }  
}
