<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PhotographerEditRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'profile_picture' => ['image', 'max:1024'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'phone_number' => ['required', 'string', 'max:255'],
            'facebook_contact' => ['string', 'nullable'],
            'instagram_contact' => ['string', 'nullable'],
        ];
    }
}
