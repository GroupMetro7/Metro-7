<?php

namespace App\Rules;

use App\Models\ReferenceNumber;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidReferenceNumber implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (empty($value)) {
            return; // Allow null/empty if field is nullable
        }

        $referenceExists = ReferenceNumber::where('reference_number', $value)->exists();

        if (!$referenceExists) {
            $fail('The reference number provided does not exist in our system.');
        }
    }
}
