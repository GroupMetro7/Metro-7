<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\StockManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{


  public function adminindex(Request $request)
  {
    $query = Product::with(['ingredients']);

    if ($request->has('search') && trim($request->search)) {
      $search = trim($request->search);
      $query->where('product_name', 'LIKE', "%{$search}%");
    }

    if ($request->has('category_id') && $request->category_id && $request->category_id !== '1') {
      $query->where('category_id', $request->category_id);
    }

    $seeProduct = $query->paginate(10);

    // Attach pivot quantity to each ingredient
    foreach ($seeProduct as $product) {
      foreach ($product->ingredients as $ingredient) {
        $ingredient->quantity = isset($ingredient->pivot) ? $ingredient->pivot->quantity : null;
      }
    }

    foreach ($seeProduct as $product) {
      $product->image_url = $product->image ? asset('storage/' . $product->image) : null;
    }

    return response()->json($seeProduct);
  }

  public function search(Request $request)
  {
    $search = $request->input('q');
    $products = Product::where('product_name', 'like', '%' . $search . '%')->paginate(10);
    return response()->json($products);
  }

  public function byCategory($categoryId)
  {
    $query = Product::query();
    if ($categoryId !== '1') {
      $query->where('category_id', $categoryId);
    }
    // Eager load relationships if needed, e.g. ->with('category')
    $products = $query->paginate(10);
    // Use Eloquent accessor for image URL (see note below)
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

    $imagePath = $request->file('image')->store('images', 'public');

    $totalIngredientCost = 0;

    if ($request->has('ingredients')) {
      $ingredients = json_decode($request->input('ingredients'), true);
      foreach ($ingredients as $ingredient) {
        $stock = StockManagement::where('SKU_NUMBER', $ingredient['sku'])->first();
        if ($stock) {
          $totalIngredientCost += ($stock->COST_PER_UNIT * $ingredient['quantity']);
        }
      }
    }

    $productPrice = $request->input('price');
    $margin = $productPrice - $totalIngredientCost;

    $product = Product::create([
      'product_name' => $request->input('product_name'),
      'price' => $request->input('price'),
      'description' => $request->input('description', ''),
      'image' => $imagePath,
      'category_id' => $request->input('category_id'),
      'margin' => $margin,
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

  public function update(Request $request, $id)
  {
    $product = Product::find($id);

    // When returning a product, eager load the accessor if needed:
    $product->append('image_url');

    if (!$product) {
      return response()->json(['message' => 'Product not found'], 404);
    }

    $request->validate([
      'product_name' => 'required|string|max:255',
      'price' => 'required|numeric',
      'description' => 'nullable|string',
      'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
      'category_id' => 'required|string',
    ]);

    $totalIngredientCost = 0;

    if ($request->has('ingredients')) {
      $ingredients = json_decode($request->input('ingredients'), true);
      foreach ($ingredients as $ingredient) {
        $stock = StockManagement::where('SKU_NUMBER', $ingredient['sku'])->first();
        if ($stock) {
          $totalIngredientCost += ($stock->COST_PER_UNIT * $ingredient['quantity']);
        }
      }
    }

    $productPrice = $request->input('price');
    $margin = $productPrice - $totalIngredientCost;

    // Handle image update
    if ($request->hasFile('image')) {
      // Delete old image if exists
      if ($product->image && Storage::disk('public')->exists($product->image)) {
        Storage::disk('public')->delete($product->image);
      }
      $imagePath = $request->file('image')->store('images', 'public');
      $product->image = $imagePath;
    }

    $product->product_name = $request->input('product_name');
    $product->price = $request->input('price');
    $product->description = $request->input('description', '');
    $product->category_id = $request->input('category_id');
    $product->margin = $margin;
    $product->save();

    // Handle ingredients update
    if ($request->has('ingredients')) {
      // Remove old ingredients
      \DB::table('product_ingredient')->where('product_id', $product->id)->delete();

      $ingredients = json_decode($request->input('ingredients'), true);
      foreach ($ingredients as $ingredient) {
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

    return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
  }
  public function destroy($id)
  {
    $product = Product::find($id);

    if (!$product) {
      return response()->json(['message' => 'Product not found'], 404);
    }

    // Delete the image from storage if it exists
    if ($product->image) {
      $imagePath = str_replace(asset('storage/'), '', $product->image); // Remove the base URL to get the relative path
      if (Storage::disk('public')->exists($imagePath)) {
        Storage::disk('public')->delete($imagePath);
      }
    }

    // Delete the product from the database
    $product->delete();

    return response()->json(['message' => 'Product deleted successfully'], 200);
  }
}