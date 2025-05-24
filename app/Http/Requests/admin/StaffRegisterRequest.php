<?php

namespace App\Http\Requests\admin;

use Illuminate\Foundation\Http\FormRequest;

class StaffRegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
          'lastname' => 'required|string|max:255',
          'firstname' => 'required|string|max:255',
          'email' => 'required|string|email|max:255|unique:users',
          'contact' => 'required|string|regex:/^\+?[0-9\s\-]+$/',
          'password' => 'required|string|min:8|confirmed',
        ];
    }
}
