<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailInquiryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'full_name' => 'required|string',
            'email' => ['required', 'email', 'regex:/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/'],
            'message' => 'required|string',
        ];
    }
}
