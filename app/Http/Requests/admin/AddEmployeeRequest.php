<?php

namespace App\Http\Requests\admin;

use Illuminate\Foundation\Http\FormRequest;

class AddEmployeeRequest extends FormRequest
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
        return [
          'name' => 'required|string|max:255',
          'email' => 'required|email|unique:employees',
          'phone' => 'required|integer',
          'username' => 'required|string|max:255',
          'role' => 'required|string|max:255',
          'schedule' => 'required|string|max:255',
          'time' => 'required|string|max:255',
        ];
    }
}
