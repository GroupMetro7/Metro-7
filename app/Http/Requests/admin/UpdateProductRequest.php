<?php

namespace App\Http\Requests\admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
          'ITEM_NAME' => 'required|string|max:55',
          'CATEGORY' => 'required|string|max:15',
          'STOCK' => 'required|integer',
          'COST_PER_UNIT' => 'required|numeric',
        ];
    }
}
