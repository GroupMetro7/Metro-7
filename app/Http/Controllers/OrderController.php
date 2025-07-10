<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\StockLog;
use Illuminate\Http\Request;
use App\Models\Ticket;
use Illuminate\Support\Facades\Auth;
use App\Mail\OrderNotification;
use Illuminate\Support\Facades\Mail;

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


  //calling order lists
  public function index(Request $request)
  {
    $query = Order::with('tickets')
      ->orderByRaw("FIELD(status, 'pending', 'completed', 'cancelled')")
      ->orderBy('created_at', 'desc');

    if ($request->has('search') && trim($request->search)) {
      $search = trim($request->search);
      $query->where(function ($q) use ($search) {
        $q->where('order_number', 'like', "%{$search}%")
          ->orWhere('name', 'like', "%{$search}%"); // <-- Add this line
      });
    }

    $orders = $query->paginate(10);
    return response()->json($orders);
  }



  //store order function

  public function store(Request $request)
  {

    $user = Auth::user();
    if (!$user) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    $validated = $request->validate([
      'customer_name' => 'string|max:255',
      'option' => 'string|max:255',
      'amount' => 'numeric',
      'discount' => 'numeric',
      'cashPayment' => 'nullable|numeric',
      'onlinePayment' => 'nullable|numeric',
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
      'discount' => $validated['discount'],
      'cashPayment' => $validated['cashPayment'] ?? 0,
      'onlinePayment' => $validated['onlinePayment'] ?? 0,
      'option' => $validated['option'],
      'user_id' => $user->id,
    ]);



    // Create the tickets associated with the order
    foreach ($validated['tickets'] as $ticketData) {
      $product = Product::with('ingredients')->find($ticketData['product_id']);
      $unitCost = $product ? $product->total_ingredient_cost : 0;

      Ticket::create([
        'order_id' => $order->id,
        'product_id' => $ticketData['product_id'],
        'product_name' => $ticketData['product_name'],
        'quantity' => $ticketData['quantity'],
        'unit_price' => $ticketData['unit_price'],
        'total_price' => $ticketData['total_price'],
        'cost' => $unitCost
      ]);
    }


    return response()->json(['message' => 'Order and tickets created successfully!', 'order' => $order], 201);
  }

  public function monthlyRevenue()
  {
    $monthlyRevenue = Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, DATE_FORMAT(created_at, "%M") as month_name, SUM(amount) as revenue')
      ->where('created_at', '>=', now()->subMonths(12))
      ->groupBy('year', 'month', 'month_name')
      ->orderBy('year', 'desc')
      ->orderBy('month', 'desc')
      ->get();

    $mostSold = \DB::table('tickets')
      ->select('product_id', 'product_name', \DB::raw('SUM(quantity) as total_quantity'))
      ->groupBy('product_id', 'product_name')
      ->orderByDesc('total_quantity')
      ->limit(5) // Limit to top 5
      ->get();

    return response()->json([
      'monthlyRevenue' => $monthlyRevenue,
      'mostSoldProduct' => $mostSold,
    ]);
  }

  //customer create order function
  public function storeCustomerOrder(Request $request)
  {

    $user = Auth::user();
    if (!$user) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    $validated = $request->validate([
      'option' => 'string|max:255',
      'amount' => 'numeric',
      'downpayment' => 'nullable|numeric',
      'refNumber' => 'nullable',
      'status' => 'nullable|string',
      'cashPayment' => 'nullable|numeric',
      'discount' => 'nullable|numeric',
      'tickets' => 'required|array',
      'tickets.*.product_id' => 'required|integer|exists:products,id',
      'tickets.*.product_name' => 'required|string|max:255',
      'tickets.*.quantity' => 'required|integer|min:1',
      'tickets.*.unit_price' => 'required|numeric|min:0',
      'tickets.*.total_price' => 'required|numeric|min:0',
    ]);


    try {
      $orderNumber = $this->generateOrderNumber();
      // Create the order
      $order = Order::create([
        'name' => $user->firstname . ' ' . $user->lastname . '(Online)',
        'order_number' => $orderNumber,
        'status' => $validated['status'] ?? 'pending',
        'amount' => $validated['amount'],
        'cashPayment' => $validated['cashPayment'] ?? 0,
        'onlinePayment' => $validated['downpayment'] ?? 0,
        'reference_Number' => $validated['refNumber'] ?? null,
        'downpayment' => $validated['downpayment'] ?? 0,
        'option' => $validated['option'],
        'discount' => $validated['discount'],
        'user_id' => $user->id,
      ]);
      $order->load('tickets');

      foreach ($validated['tickets'] as $ticketData) {
        Ticket::create([
          'order_id' => $order->id,
          'product_id' => $ticketData['product_id'],
          'product_name' => $ticketData['product_name'],
          'quantity' => $ticketData['quantity'],
          'unit_price' => $ticketData['unit_price'],
          'total_price' => $ticketData['total_price'],
        ]);

        Mail::to($user->email)->send(new OrderNotification($user, $order));
      }
      return response()->json(['message' => 'Order and tickets created successfully!', 'order' => $order], 201);
    } catch (\Exception $e) {
      \Log::error($e);
      return response()->json(['error' => $e->getMessage()], 500);
    }
  }
}
