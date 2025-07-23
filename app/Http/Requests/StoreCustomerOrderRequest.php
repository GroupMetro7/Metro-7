<?php

namespace App\Http\Requests;

use App\Rules\ValidReferenceNumber;
use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerOrderRequest extends FormRequest
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
            'option' => 'string|max:255',
            'amount' => 'numeric',
            'downpayment' => 'nullable|numeric',
            'refNumber' => ['nullable', 'string', new ValidReferenceNumber],
            'status' => 'nullable|string',
            'cashPayment' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'tickets' => 'required|array',
            'tickets.*.product_id' => 'required|integer|exists:products,id',
            'tickets.*.product_name' => 'required|string|max:255',
            'tickets.*.quantity' => 'required|integer|min:1',
            'tickets.*.unit_price' => 'required|numeric|min:0',
            'tickets.*.total_price' => 'required|numeric|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'refNumber.valid_reference_number' => 'The reference number must exist in our payment system.',
        ];
    }
}
