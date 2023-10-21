<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
