<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UnregisteredUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'phone_number' => ['required'],
            'first_name' => ['required'],
            'last_name' => ['required'],
        ];
    }
}
