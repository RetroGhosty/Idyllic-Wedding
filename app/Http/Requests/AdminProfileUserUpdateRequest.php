<?php

namespace App\Http\Requests;

use App\choices\UserAccountLevel;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\User;
use Illuminate\Validation\Rule;
use App\choices\UserAccountStatusEnum;

class AdminProfileUserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = User::find($this->route("user_id"));
        $availableAccountLevel = UserAccountLevel::cases();
        $availableAccountStatus = UserAccountStatusEnum::cases();
        return [
            'first_name' => ['string', 'max:255'],
            'last_name' => ['string', 'max:255'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'user_level' => ['string', Rule::in(array_column($availableAccountLevel,'value'))],
            'status' => ['string', Rule::in(array_column($availableAccountStatus,'value'))]
        ];
    }
    public function messages(): array{
        return [
            'user_level.max' => "Invalid Permission"
        ];
    }
}
