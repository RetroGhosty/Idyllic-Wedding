<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
class ThemeCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image'
    ];

    public function venues(): HasMany
    {
        return $this->hasMany(Venue::class, 'venues');
    }
}
