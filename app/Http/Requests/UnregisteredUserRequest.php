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

    public function messages(): array
    {
        return [
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',
            'phone_number.required' => 'Phone number is required',
            'first_name.required' => 'First name is required',
            'last_name.required' => 'Last name is required',
        ];
    }
}
