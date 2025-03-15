<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddProductRequest;
use App\Http\Requests\UpdateInvRequest;
use App\Models\InventoryManagement;
use Illuminate\Http\Request;

class InventoryManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $products = InventoryManagement::all();
      return response()->json($products);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function AddProduct(AddProductRequest $request)
    {
      $validated = $request->validated();

      $product = new InventoryManagement();
      $product->SKU_NUMBER = $validated['SKU_NUMBER'];
      $product->ITEM_NAME = $validated['ITEM_NAME'];
      $product->CATEGORY = $validated['CATEGORY'];
      $product->STOCK = $validated['STOCK'];
      $product->COST_PER_UNIT = $validated['COST_PER_UNIT'];
      $product->STOCK_VALUE = $validated['STOCK'] * $validated['COST_PER_UNIT'];
      $product->save();

      return response()->json(['message' => 'Product added successfully', 'product' => $product], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryManagement $inventoryManagement)
    {
        //
    }

        /**
     * Update the specified resource in storage.
     */

    public function updateStock(UpdateInvRequest $request, $id)
    {
        $validated = $request->validate();

        $product = InventoryManagement::findOrFail($id);
        $product->STOCK = $validated['STOCK'];
        $product->save();

        return response()->json(['message' => 'Stock updated successfully', 'product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryManagement $inventoryManagement)
    {
        //
    }
}
