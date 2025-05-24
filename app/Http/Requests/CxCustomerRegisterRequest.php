<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CxCustomerRegisterRequest extends FormRequest
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
            'email' => 'required|string|email|max:255|unique:customers',
            'contact' => 'required|integer',
            'password' => 'required|string|min:8|confirmed',
        ];
    }
}
