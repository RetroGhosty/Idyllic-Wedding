<?php

namespace App\Rules;

use App\Models\Venue;
use App\Models\VenueLandingPhoto;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class DoesVenueHeaderImgAlreadyExist implements ValidationRule
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
        if ($this->validateIntent == "patch"){
            $venue = Venue::find($this->venue_id)->landing_photo;
            if ($venue != null){
                $fail("Venue already has header image");
            }
        }
    }
}
