<?php

namespace App\Http\Controllers\serviceControls;

use App\Http\Controllers\Controller;
use App\Models\product;
use Illuminate\Http\Request;

class serviceController extends Controller
{
    public function index(Request $request)
{
    $query = product::with('category');
    if ($request->has('category_id') && $request->category_id != 1 && strtolower($request->category_id) != 'all') {
        $query->where('category_id', $request->category_id);
    } elseif (!$request->has('category_id') || $request->category_id == 1 || strtolower($request->category_id) == 'all') {
        // No filter needed
    } else {
        $query->where('category_id', '!=', 1);
    }

    $menuData = $query->get();

    // Add full image URL to each product
    foreach ($menuData as $product) {
        $product->image_url = $product->image ? asset('storage/' . $product->image) : null;
    }

    return response()->json($menuData);
}
}
