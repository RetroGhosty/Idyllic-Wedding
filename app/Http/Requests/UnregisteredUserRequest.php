<?php

namespace App\Http\Requests;

use App\Models\UnregisteredUser;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
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
            'email' => ['required', 'email', 'regex:/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z]+)+$/'],
            'phone_number' => ['required', 'regex:/^0?\d{10}$/'],
            'first_name' => ['required', 'max:20', 'string'],
            'last_name' => ['required', 'max:20', 'string'],
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
