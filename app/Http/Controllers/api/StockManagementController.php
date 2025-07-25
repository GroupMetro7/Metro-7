<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\AddProductRequest;
use App\Models\StockLog;
use App\Models\StockManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StockManagementController extends Controller
{
  /**
   * Display a listing of the inventory table.
   */
  public function index(Request $request)
  {
    $filter = $request->input('filterStock') ?? 'asc';
    $products = StockManagement::orderBy('STOCK', $filter);

    if ($request->has('search') && trim($request->search)) {
      $search = trim($request->search);
      // $search = preg_replace('/[^\w\s-]/u', '', $search);
      $products->where(function ($q) use ($search) {
        $q->where('COMPOSITE_NAME', 'LIKE', "%{$search}%")
          ->orWhere('SKU_NUMBER', 'LIKE', "%{$search}%")
          ->orWhere('STATUS', 'LIKE', "%{$search}%");
      });
    }

    $stocks = $products->paginate(10);
    return response()->json($stocks);
  }

  public function Ingredients()
  {
    $products = StockManagement::all();
    return response()->json($products);
  }

  // add product to the inventory table
  public function AddProduct(AddProductRequest $request)
  {

    $admin = Auth::user();
    if (!$admin || !$admin->isAdmin()) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    $validated = $request->validated();

    $product = new StockManagement();
    $product->SKU_NUMBER = $this->generateSKUNumber();
    $product->COMPOSITE_NAME = $validated['COMPOSITE_NAME'];
    $product->category_id = $validated['category_id'] || 1;
    $product->STOCK_VALUE = $validated['STOCK_VALUE'];
    $product->STOCK = $validated['STOCK'];
    $product->COST_PER_UNIT = $validated['STOCK_VALUE'] / $validated['STOCK'];
    $product->SOLD_BY = $validated['SOLD_BY'];
    $product->warning_threshold = $validated['warning_threshold'];
    $product->save();


    StockLog::create([
      'item_name' => $product->COMPOSITE_NAME,
      'sku_number' => $product->SKU_NUMBER,
      'quantity' => $product->STOCK,
      'type' => 'in',
      'user_name' => $admin->firstname . ' ' . $admin->lastname,
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

    $admin = Auth::user();
    if (!$admin || !$admin->isAdmin()) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    $validated = $request->validate([
      'SKU_NUMBER' => 'sometimes|required|string|max:255',
      'COMPOSITE_NAME' => 'sometimes|required|string|max:255',
      'category_id' => 'sometimes',
      'STOCK' => 'sometimes|required',
      'COST_PER_UNIT' => 'sometimes|required|numeric',
      'SOLD_BY' => 'required',
      'remarks' => 'sometimes|string|max:255',
      'warning_threshold' => 'sometimes|integer',
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
    if (isset($validated['warning_threshold'])) {
      $product->warning_threshold = $validated['warning_threshold'];
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
        'item_name' => $product->COMPOSITE_NAME,
        'sku_number' => $product->SKU_NUMBER,
        'quantity' => $stockChange,
        'type' => $stockChange > 0 ? 'in' : 'out',
        'value' => abs($stockChange) * $product->COST_PER_UNIT,
        'user_name' => $admin->firstname . ' ' . $admin->lastname,
        'remarks' => $validated['remarks'] ?? null,
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

    $admin = Auth::user();
    if (!$admin || !$admin->isAdmin()) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }
    $product = StockManagement::findOrFail($id);
    $product->delete();


    return response()->json(['message' => 'Product deleted successfully']);
  }
}
