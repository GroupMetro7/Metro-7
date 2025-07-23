<?php

namespace App\Http\Controllers;

use App\Models\ReferenceNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReferenceNumberController extends Controller
{
    // Create a new reference number (e.g., from payment)
    public function store(Request $request)
    {
        // Validate using model rules
        $validator = Validator::make($request->all(), ReferenceNumber::rules());

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $referenceNumber = ReferenceNumber::create($request->only(['name', 'reference_number', 'amount']));

            return response()->json([
                'success' => true,
                'message' => 'Reference number created successfully',
                'data' => $referenceNumber
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create reference number: ' . $e->getMessage()
            ], 500);
        }
    }

    // Validate a reference number
    public function validate(Request $request, $referenceNumber)
    {
        if (!ReferenceNumber::isValidReference($referenceNumber)) {
            return response()->json([
                'valid' => false,
                'message' => 'Reference number not found'
            ], 404);
        }

        $reference = ReferenceNumber::getReference($referenceNumber);

        return response()->json([
            'valid' => true,
            'data' => [
                'name' => $reference->name,
                'amount' => $reference->amount,
                'created_at' => $reference->created_at,
                'is_used' => $reference->isUsed()
            ]
        ]);
    }

    // List all reference numbers
    public function index()
    {
        $references = ReferenceNumber::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $references
        ]);
    }
}
