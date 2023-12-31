<?php

namespace App\Http\Requests;

use App\Rules\DoesVenueHeaderImgAlreadyExist;
use App\Rules\VenueShowcasePhotoMaximumLimit;
use Illuminate\Foundation\Http\FormRequest;

class VenuePostRequest extends FormRequest
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
            'address' => ['required'],
            'limit' => ['numeric', 'required', 'min:10', 'max:1000'],
            'price' => ['numeric', 'required', 'min:0', 'max:20000'],
            'place_category' => ['required'],
            'theme_category' => ['required'],
            'header_image' => ['required', 'image', new DoesVenueHeaderImgAlreadyExist('post', null)],
            'sub_images' => ['required', 'array', new VenueShowcasePhotoMaximumLimit('post', null)],
            'sub_images.*' => ['required', 'image'],
        ];
    }
}
