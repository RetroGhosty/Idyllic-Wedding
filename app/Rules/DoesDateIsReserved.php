<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DoesDateIsReserved implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $fetchAllBooking = DB::table('transactions')->where('event_date', '>=', Carbon::now()->subMonths(3))->where('event_date', '>=', date('Y-m-d'))->latest('updated_at')->get();
        $customerDesireDate = Carbon::parse($value)->format('Y-m-d');
        for ($i=0; $i < count($fetchAllBooking); $i++) { 
            if ($fetchAllBooking[$i]->event_date == $customerDesireDate){
                $fail("Date is already reserved");
            }
        }
    }
}
