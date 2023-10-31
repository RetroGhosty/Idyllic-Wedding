<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VenueRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'venue_name' => ['required'],
            'description' => ['required'],
            'limit' => ['numeric', 'required', 'min:10'],
            'price' => ['numeric', 'required', 'min:0'],
            'header_image' => ['image'],
            'sub_images' => ['array'],
            'sub_images.*' => ['image'],
        ];
    }
}

