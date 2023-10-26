<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class reservation_transaction extends Model
{
    use HasFactory;
    public $fillable = [
        'venue_id',
        'photographer_id',
        'total_price',
        'event_on',
    ];
    public function registered_userid(): BelongsTo{
        return $this->BelongsTo(User::class);
    }

    public function unregistered_user(): BelongsTo{
        return $this->BelongsTo(unregistered_user::class);
    }
    public function venue(): BelongsTo{
        return $this->BelongsTo(venue::class);
    }
}
