<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferenceNumber extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'reference_number',
        'amount'
    ];

    protected $casts = [
        'amount' => 'decimal:2'
    ];

    // Check if a reference number exists and is valid
    public static function isValidReference($referenceNumber)
    {
        return self::where('reference_number', $referenceNumber)->exists();
    }

    // Get reference number details
    public static function getReference($referenceNumber)
    {
        return self::where('reference_number', $referenceNumber)->first();
    }
}
