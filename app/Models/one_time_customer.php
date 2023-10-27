<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class One_time_customer extends Model
{
    use HasFactory;
    protected $fillable = [
        'email',
        'phone_number',
        'first_name',
        'last_name',
    ];
}
