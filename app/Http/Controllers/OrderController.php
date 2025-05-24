<?php
namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\product;
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

          $product = product::with('ingredients')->find($ticketData['product_id']);
          foreach ($product->ingredients as $ingredient) {
            $decrementAmount = $ingredient->pivot->quantity * $ticketData['quantity'];
            $ingredient->decrement('STOCK', $decrementAmount);

                  // Calculate STOCK_VALUE if STOCK or COST_PER_UNIT is updated
            $ingredient->STOCK_VALUE = $ingredient->STOCK * $ingredient->COST_PER_UNIT;
        }
      }

      return response()->json(['message' => 'Order and tickets created successfully!', 'order' => $order], 201);
  }

    public function monthlyRevenue()
    {
    $monthlyRevenue = Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, SUM(amount) as revenue')
        ->groupBy('year', 'month')
        ->orderBy('year', 'desc')
        ->orderBy('month', 'desc')
        ->get();

    $mostSold = \DB::table('tickets')
        ->select('product_id', 'product_name', \DB::raw('SUM(quantity) as total_quantity'))
        ->groupBy('product_id', 'product_name')
        ->orderByDesc('total_quantity')
        ->first();

    return response()->json([
        'monthlyRevenue' => $monthlyRevenue,
        'mostSoldProduct' => $mostSold,
    ]);
    }
}
