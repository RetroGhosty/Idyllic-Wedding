<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Refund extends Model
{
    use HasFactory;
    protected $fillable = [
        'transaction_id',
        'customer_id',
        'refund_id'
    ];

    public function transaction(): HasOne{
        return $this->hasOne(Transaction::class, 'id', 'transaction_id');
    }

    public function customer(): BelongsTo{
        return $this->belongsTo(UnregisteredUser::class, 'id', 'customer_id');
    }

}
