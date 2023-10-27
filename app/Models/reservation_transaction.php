<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reservation_transaction extends Model
{
    use HasFactory;
    public $fillable = [
        'Venue_id',
        'Photographer_id',
        'total_price',
        'event_on',
    ];
    public function registered_userid(): BelongsTo{
        return $this->BelongsTo(User::class);
    }

    public function Unregistered_user(): BelongsTo{
        return $this->BelongsTo(Unregistered_user::class);
    }
    public function Venue(): BelongsTo{
        return $this->BelongsTo(Venue::class);
    }
}
