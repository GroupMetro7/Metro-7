<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\AddProductRequest;
use App\Models\StockLog;
use App\Models\StockManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        public function Ingredients()
    {
      $products = StockManagement::paginate();
      return response()->json($products);
    }

    // add product to the inventory table
    public function AddProduct(AddProductRequest $request)
    {
      $validated = $request->validated();

      $product = new StockManagement();
      $product->SKU_NUMBER = $this->generateSKUNumber();
      $product->COMPOSITE_NAME = $validated['COMPOSITE_NAME'];
      $product->category_id = $validated['category_id'];
      $product->STOCK = $validated['STOCK'];
      $product->COST_PER_UNIT = $validated['COST_PER_UNIT'];
      $product->SOLD_BY = $validated['SOLD_BY'];
      $product->STOCK_VALUE = $validated['STOCK'] * $validated['COST_PER_UNIT'];
      $product->save();


      StockLog::create([
                'sku_number' => $product->SKU_NUMBER,
                'quantity' => $product->STOCK,
                'type' => 'in',
            ]);

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
            'COMPOSITE_NAME' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes',
            'STOCK' => 'sometimes|required',
            'COST_PER_UNIT' => 'sometimes|required|numeric',
            'SOLD_BY' => 'required'
        ]);

        $product = StockManagement::findOrFail($id);

        if (isset($validated['SKU_NUMBER'])) {
            $product->SKU_NUMBER = $validated['SKU_NUMBER'];
        }
        if (isset($validated['COMPOSITE_NAME'])) {
            $product->COMPOSITE_NAME = $validated['COMPOSITE_NAME'];
        }
        if (isset($validated['category_id'])) {
            $product->category_id = $validated['category_id'];
        }
        if (isset($validated['STOCK'])) {
            $product->STOCK = $validated['STOCK'];
        }
        if (isset($validated['COST_PER_UNIT'])) {
            $product->COST_PER_UNIT = $validated['COST_PER_UNIT'];
        }
        if (isset($validated['SOLD_BY'])) {
            $product->SOLD_BY = $validated['SOLD_BY'];
        }

        // Update the STOCK_VALUE based on the new STOCK and COST_PER_UNIT
        if (isset($validated['STOCK']) || isset($validated['COST_PER_UNIT'])) {
            $product->STOCK_VALUE = ($validated['STOCK'] ?? $product->STOCK) * ($validated['COST_PER_UNIT'] ?? $product->COST_PER_UNIT);
        }
        // Calculate stock change for logging
        $originalStock = $product->getOriginal('STOCK');
        $product->save();

        $stockChange = $product->STOCK - $originalStock;
        if ($stockChange != 0) {
            StockLog::create([
                'sku_number' => $product->SKU_NUMBER,
                'quantity' => $stockChange,
                'type' => $stockChange > 0 ? 'in' : 'out',
                'value' => abs($stockChange) * $product->COST_PER_UNIT,
            ]);
        }
        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function showExpense()
{
    // Use DB facade for aggregation to avoid Eloquent overhead
    $totalExpense = \DB::table('stock_logs')->sum('value');
    $totalStockValue = \DB::table('stock_management')->sum('STOCK_VALUE');

    // Use raw expressions and select only what you need
    $monthlyExpenses = \DB::table('stock_logs')
        ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, SUM(value) as total")
        ->groupBy('month')
        ->orderBy('month', 'desc')
        ->get();

    return response()->json([
        'total_expense' => $totalExpense ?? 0,
        'total_stock_value' => $totalStockValue ?? 0,
        'monthly_expenses' => $monthlyExpenses,
    ]);
}

    public function destroy($id)
    {
        $product = StockManagement::findOrFail($id);
        $product->delete();


        return response()->json(['message' => 'Product deleted successfully']);
    }
}
