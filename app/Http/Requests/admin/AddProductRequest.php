<?php

namespace App\Http\Requests\admin;

use Illuminate\Foundation\Http\FormRequest;

class AddProductRequest extends FormRequest
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
            'COMPOSITE_NAME' => 'required|string|max:55',
            'category_id' => 'nullable|string|max:15',
            'STOCK' => 'required',
            'STOCK_VALUE' => 'required|numeric',
            'SOLD_BY' => 'required',
        ];
    }
}
