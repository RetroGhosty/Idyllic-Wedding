<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReservationTransaction extends Model
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
        return $this->BelongsTo(UnregisteredUser::class);
    }
    public function Venue(): BelongsTo{
        return $this->BelongsTo(Venue::class);
    }
}
