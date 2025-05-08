<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {

      $user= Auth::user();
      if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

      $validated = $request->validate([
          'name' => 'nullable|string',
          'status' => 'nullable|string',
          'tickets' => 'required|array',
          'tickets.*.product_id' => 'required|integer|exists:products,id',
          'tickets.*.quantity' => 'required|integer|min:1',
          'tickets.*.unit_price' => 'required|numeric|min:0',
          'tickets.*.total_price' => 'required|numeric|min:0',
      ]);


      // Create the order
      $order = Order::create([
          'name' => $user->firstname,
          'status' => $validated['status'] ?? 'pending',
      ]);

      // Create the tickets associated with the order
      foreach ($validated['tickets'] as $ticketData) {
          Ticket::create([
              'order_id' => $order->id,
              'product_id' => $ticketData['product_id'],
              'quantity' => $ticketData['quantity'],
              'unit_price' => $ticketData['unit_price'],
              'total_price' => $ticketData['total_price'],
          ]);
      }

      return response()->json(['message' => 'Order and tickets created successfully!', 'order' => $order], 201);
  }
}
