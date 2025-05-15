<?php
namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{

  //order_number generator. for each order created
  private function generateOrderNumber()
{
    $lastOrder = Order::orderBy('id', 'desc')->first();
    $lastNumber = $lastOrder ? intval(substr($lastOrder->order_number, -4)) : 0;
    $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);
    return 'ORD-' . $newNumber;
}

    public function index()
    {
      $orders = Order::with('tickets')->get();
      return response()->json($orders);
    }

    public function store(Request $request)
    {

      $user= Auth::user();
      if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

      $validated = $request->validate([
          'customer_name' => 'string|max:255',
          'option' => 'string|max:255',
          'amount' => 'numeric',
          'status' => 'nullable|string',
          'tickets' => 'required|array',
          'tickets.*.product_id' => 'required|integer|exists:products,id',
          'tickets.*.product_name' => 'required|string|max:255',
          'tickets.*.quantity' => 'required|integer|min:1',
          'tickets.*.unit_price' => 'required|numeric|min:0',
          'tickets.*.total_price' => 'required|numeric|min:0',
      ]);

      $orderNumber = $this->generateOrderNumber();
      // Create the order
      $order = Order::create([
          'name' => $validated['customer_name'],
          'order_number' => $orderNumber,
          'status' => $validated['status'] ?? 'pending',
            'amount' => $validated['amount'],
          'option' => $validated['option']
      ]);

      // Create the tickets associated with the order
      foreach ($validated['tickets'] as $ticketData) {
          Ticket::create([
              'order_id' => $order->id,
              'product_id' => $ticketData['product_id'],
              'product_name' => $ticketData['product_name'],
              'quantity' => $ticketData['quantity'],
              'unit_price' => $ticketData['unit_price'],
              'total_price' => $ticketData['total_price'],
          ]);
      }

      return response()->json(['message' => 'Order and tickets created successfully!', 'order' => $order], 201);
  }

}
