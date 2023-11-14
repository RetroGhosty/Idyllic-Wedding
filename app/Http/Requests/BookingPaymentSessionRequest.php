<?php

namespace App\Http\Requests;

use App\Rules\DoesDateIsReserved;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class BookingPaymentSessionRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        
        return [
            //
            'user_id' => ['required'],
            'venue_id' => ['required'],
            'dateSelected' => ['required', new DoesDateIsReserved],
        ];
    }
}
