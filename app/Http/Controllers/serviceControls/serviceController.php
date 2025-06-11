<?php

namespace App\Http\Controllers\serviceControls;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class serviceController extends Controller
{
    public function index(Request $request)
{
      $products = Product::with(['ingredients'])->get();

    // Attach pivot quantity to each ingredient
    foreach ($products as $product) {
        foreach ($product->ingredients as $ingredient) {
            $ingredient->quantity = $ingredient->pivot->quantity;
        }
    }

    $query = Product::with('category');
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

    return response()->json([
        'products' => $menuData,
    ]);
}
}
