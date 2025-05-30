<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class ProductController extends Controller
{
  // public function index()
  // {
  //   $products = product::all()->map(function ($product) {
  //       if ($product->image) {
  //           $product->image = asset('storage/' . $product->image); // Generate full URL for the image
  //       }
  //       return $product;
  //   });
  //   return response()->json($products, 200);
  // }

  public function adminindex()
    {
      $products = product::paginate(5);
      return response()->json($products);
    }


  public function byCategory($categoryId)
    {
      if ($categoryId === '1') {
          $products = product::all()->map(function ($product) {
              if ($product->image) {
                  $product->image = asset('storage/' . $product->image);
              }
              return $product;
          });
          return response()->json($products);
      }
      $products = product::where('category_id', $categoryId)->get()->map(function ($product) {
              if ($product->image) {
                  $product->image = asset('storage/' . $product->image);
              }
              return $product;
          });
      return response()->json($products);
    }

public function store(Request $request)
{
    $request->validate([
        'product_name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'category_id' => 'required|string',
    ]);

    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('images', 'public');
    }

    $product = product::create([
        'product_name' => $request->input('product_name'),
        'price' => $request->input('price'),
        'description' => $request->input('description', ''),
        'image' => $imagePath,
        'category_id' => $request->input('category_id'),
    ]);

    // Handle ingredients
    if ($request->has('ingredients')) {
        $ingredients = json_decode($request->input('ingredients'), true);
        foreach ($ingredients as $ingredient) {
            // Find the ingredient by SKU
            $stock = \DB::table('stock_management')->where('SKU_NUMBER', $ingredient['sku'])->first();
            if ($stock) {
                \DB::table('product_ingredient')->insert([
                    'product_id' => $product->id,
                    'ingredient_id' => $stock->id,
                    'quantity' => $ingredient['quantity'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
}
    public function destroy($id)
  {
      $product = product::find($id);

      if (!$product) {
          return response()->json(['message' => 'Product not found'], 404);
      }

      // Delete the image from storage if it exists
      if ($product->image) {
          $imagePath = str_replace(asset('storage/'), '', $product->image); // Remove the base URL to get the relative path
          if (\Storage::disk('public')->exists($imagePath)) {
              \Storage::disk('public')->delete($imagePath);
          }
      }

      // Delete the product from the database
      $product->delete();

      return response()->json(['message' => 'Product deleted successfully'], 200);
  }
}
