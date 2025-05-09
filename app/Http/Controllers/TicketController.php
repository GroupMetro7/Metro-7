<?php

namespace App\Http\Controllers;

use App\Models\product;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
  public function store(Request $request)
  {

      try {
          $validated = $request->validate([
              'id' => 'required|array',
              'quantity' => 'required|integer|min:1',
          ]);
      } catch (\Illuminate\Validation\ValidationException $e) {
          return response()->json(['error' => 'Validation failed', 'details' => $e->errors()], 422);
      }

      $totalPrice = collect($validated['items'])->sum(function ($item) {
          $product = product::find($item['id']);
          return $product->price * $item['quantity'];
      });

      $order = Ticket::create([
          'items' => json_encode($validated['items']),
          'total_price' => $totalPrice,
      ]);
  }
}
