<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\StockLog;
use App\Models\StockManagement;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class RetrieveDataController extends Controller
{
  public function AdminData()
  {
    // Use raw expressions and select only what you need
    $monthlyExpenses = StockLog::where('type', 'out')
      ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, SUM(value) as total")
      ->groupBy('month')
      ->orderBy('month', 'desc')
      ->get();

    $monthlyRevenue = Order::selectRaw('YEAR(created_at) as year, MONTH(created_at) as month, DATE_FORMAT(created_at, "%M") as month_name, SUM(amount) as revenue')
      ->where('created_at', '>=', now()->subMonths(12))
      ->where('status', 'completed')
      ->groupBy('year', 'month', 'month_name')
      ->orderBy('year', 'desc')
      ->orderBy('month', 'desc')
      ->get();

    $mostSold = \DB::table('tickets')
      ->select('product_id', 'product_name', \DB::raw('SUM(quantity) as total_quantity'))
      ->groupBy('product_id', 'product_name')
      ->orderByDesc('total_quantity')
      ->limit(5)
      ->get();

    $orders = Order::with('tickets')->paginate(10);

    $dailOrders = Order::selectRaw('DATE(created_at) as date, COUNT(*) as total_orders, SUM(amount) as total_amount')
      ->where('status', 'completed')
      ->groupBy('date')
      ->orderBy('date', 'desc')
      ->get();


    return response()->json([
      'orders' => $orders,
      'monthly_expenses' => $monthlyExpenses,
      'monthly_revenue' => $monthlyRevenue,
      'most_sold_product' => $mostSold,
      'daily_orders' => $dailOrders,
    ]);
  }

public function salesProductRevenue(Request $request)
{
  try {
    $query = Ticket::selectRaw('product_id, product_name, DATE_FORMAT(created_at, "%M") as month, SUM(quantity * unit_price) as total_product_sales, SUM(quantity) as total_quantity_sold')
      ->whereHas('order', function ($query) {
        $query->where('status', 'completed');
      })
      ->groupBy('product_id', 'product_name', 'month');

    // Add month filter if needed
    if ($request->has('month') && $request->month !== '') {
      $query->havingRaw('month = ?', [$request->month]);
    }else {
      $query->havingRaw('month = ?', [now()->format('F')]);
    }

    $salesData = $query->orderBy('total_product_sales', 'desc')
      ->paginate(10);

    return response()->json($salesData);
  } catch (\Exception $e) {
    return response()->json(['error' => $e->getMessage()], 500);
  }
}


  public function index(Request $request)
  {
    $ordersQuery = Order::with('tickets', 'user')->where('status', 'completed')->orderBy('created_at', 'desc');
    if ($request->has('search') && trim($request->search)) {
      $search = trim($request->search);
      $ordersQuery->where(function ($q) use ($search) {
        $q->where('order_number', 'like', "%{$search}%")
          ->orWhereHas('user', function ($uq) use ($search) {
            $uq->where('firstname', 'like', "%{$search}%")
              ->orWhere('lastname', 'like', "%{$search}%");
          });
      });
    }
    if ($request->has('filterDate') && trim($request->filterDate)){
      $filterDate = trim($request->filterDate);
      $ordersQuery->where(function ($q) use ($filterDate) {
        $q->whereDate('created_at', 'like', "%{$filterDate}%");
      });
    }
    $completedOrders = (clone $ordersQuery)->paginate(15);
    $totalCompletedOrders = $completedOrders->total();
    $actualSales = $ordersQuery->sum('amount');

    $totalStockValue = StockManagement::sum('STOCK_VALUE');
    $totalExpense = StockLog::where('type', 'out')->sum('value');
    return response()->json([
      'completedOrders' => $completedOrders,
      'totalCompletedOrders' => $totalCompletedOrders,
      'actualSales' => $actualSales,
      'totalStockValue' => $totalStockValue,
      'totalExpense' => $totalExpense,
    ]);
  }

  public function getStockLogs(Request $request)
  {
    $query = StockLog::orderBy('created_at', 'desc');

    if ($request->has('search') && trim($request->search)) {
      $search = trim($request->search);
      $query->where(function ($q) use ($search) {
        $q->where('type', 'like', "%{$search}%")
          ->orWhere('value', 'like', "%{$search}%")
          ->orWhere('sku_number', 'like', "%{$search}%")
          ->orWhere('created_at', 'like', "%{$search}%");
      });
    }

    $stocklogs = $query->paginate(20);
    return response()->json($stocklogs);
  }

  public function getTicketsData()
  {
    $productSold = Ticket::all();
    return response()->json($productSold);
  }

  public function getInventoryKPI()
  {
    $totalUnavailableItems = StockManagement::where('STATUS', 'Unavailable')->count();
    $totalAvailableItems = StockManagement::where('STATUS', 'Available')->count();
    $totalLowStockItems = StockManagement::where('STATUS', 'Low Stock')->count();

    return response()->json([
      'totalUnavailableItems' => $totalUnavailableItems,
      'totalAvailableItems' => $totalAvailableItems,
      'totalLowStockItems' => $totalLowStockItems,
    ]);
  }
}
