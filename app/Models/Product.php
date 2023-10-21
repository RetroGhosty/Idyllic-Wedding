<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory, HasUlids;
    protected $fillable = [
        "name", "price", "shop_id", "description", "image"
    ] ;

    public function shop(): BelongsTo{
        return $this->belongsTo(Shop::class);
    }
}
