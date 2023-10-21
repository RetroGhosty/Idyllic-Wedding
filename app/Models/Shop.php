<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Shop extends Model
{
    use HasFactory, HasUlids;
    protected $fillable = [
        'id',
        'vendor_id',
        'shop_name',
    ];
    protected $hidden = [
        'vendor_name'
    ];

    public function vendor_id(): HasOne{
        return $this->hasOne(User::class);
    }
    public function product(): HasMany{
        return $this->hasMany(Product::class);
    }
}
