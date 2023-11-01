<?php

namespace App\Rules;

use App\Models\Venue;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class VenueShowcasePhotoMaximumLimit implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */

     protected $venue_id;
     protected $validateIntent; // Is post or patch

     public function __construct(string $validateIntent, ?int $venue_id)
     {
         $this->venue_id = $venue_id;
         $this->validateIntent = $validateIntent;
     }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($this->validateIntent == "post"){
            if (count($value) > 8){
                $fail("Venue already has maximum number of showcase images");
            }
        } else{
            $venueShowcasePhoto = Venue::find($this->venue_id)->showcase_photo;
            $totalShowcasePhoto = count($venueShowcasePhoto) + count($value);
            if ($totalShowcasePhoto > 8){
                $fail("Venue already has maximum number of showcase images");
            }
        }
    }
}
