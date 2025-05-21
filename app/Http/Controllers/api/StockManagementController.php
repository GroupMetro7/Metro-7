<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\AddProductRequest;
use App\Http\Requests\admin\UpdateProductRequest;
use App\Models\StockManagement;
use Illuminate\Http\Request;

class StockManagementController extends Controller
{
    /**
     * Display a listing of the inventory table.
     */
    public function index()
    {
      $products = StockManagement::paginate(10);
      return response()->json($products);
    }

    // add product to the inventory table
    public function AddProduct(AddProductRequest $request)
    {
      $validated = $request->validated();

      $product = new StockManagement();
      $product->SKU_NUMBER = $this->generateSKUNumber();
      $product->COMPOSITE_NAME = $validated['ITEM_NAME'];
      $product->CATEGORY = $validated['CATEGORY'];
      $product->STOCK = $validated['STOCK'];
      $product->COST_PER_UNIT = $validated['COST_PER_UNIT'];
      $product->STOCK_VALUE = $validated['STOCK'] * $validated['COST_PER_UNIT'];
      $product->save();

      return response()->json(['message' => 'Product added successfully', 'product' => $product], 201);
    }

    private function generateSKUNumber()
    {
      $lastSKU = StockManagement::orderBy('id', 'desc')->first();
      $lastSKU = $lastSKU ? intval(substr($lastSKU->SKU_NUMBER, -4)) : 0;
      $newNumber = str_pad($lastSKU + 1, 4, '0', STR_PAD_LEFT);
      return 'SKU' . '-' . $newNumber;
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'SKU_NUMBER' => 'sometimes|required|string|max:255',
            'ITEM_NAME' => 'sometimes|required|string|max:255',
            'CATEGORY' => 'sometimes|required|string|max:255',
            'STOCK' => 'sometimes|required|integer',
            'COST_PER_UNIT' => 'sometimes|required|numeric',
        ]);

        $product = StockManagement::findOrFail($id);

        if (isset($validated['SKU_NUMBER'])) {
            $product->SKU_NUMBER = $validated['SKU_NUMBER'];
        }
        if (isset($validated['ITEM_NAME'])) {
            $product->COMPOSITE_NAME = $validated['ITEM_NAME'];
        }
        if (isset($validated['CATEGORY'])) {
            $product->CATEGORY = $validated['CATEGORY'];
        }
        if (isset($validated['STOCK'])) {
            $product->STOCK = $validated['STOCK'];
        }
        if (isset($validated['COST_PER_UNIT'])) {
            $product->COST_PER_UNIT = $validated['COST_PER_UNIT'];
        }

        // Update the STOCK_VALUE based on the new STOCK and COST_PER_UNIT
        if (isset($validated['STOCK']) || isset($validated['COST_PER_UNIT'])) {
            $product->STOCK_VALUE = ($validated['STOCK'] ?? $product->STOCK) * ($validated['COST_PER_UNIT'] ?? $product->COST_PER_UNIT);
        }
        $product->save();
        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function destroy($id)
    {
        $product = StockManagement::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
