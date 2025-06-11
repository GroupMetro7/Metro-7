<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('products')->get();
        return response()->json($categories);
    }

    //create category
    public function create(Request $request)
    {
      $validated = $request->validate([
          'name' => 'required|string|max:255|unique:categories,name',
      ]);

      $category = Category::create([
        'name' => $validated['name'],
      ]);

      return response()->json($category);
    }

public function updateCategory(Request $request, $id)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255|unique:categories,name,' . $id,
    ]);

    $category = Category::findOrFail($id);
    $category->name = $validated['name'];
    $category->save();

    return response()->json($category);
}

    //delete category
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        if ($category->name === 'All' || $category->id == 1) {
            return response()->json(['message' => 'Cannot delete the default "All" category.'], 403);
        }
        $category->delete();
        return response()->json(['message' => 'Category deleted.']);
    }
}
