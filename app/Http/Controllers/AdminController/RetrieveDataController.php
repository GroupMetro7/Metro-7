<?php

namespace App\Http\Controllers\AdminController;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RetrieveDataController extends Controller
{
        public function AdminData()
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

    $orders = Order::with('tickets')->paginate(10);

    return response()->json([
        'orders' => $orders,
        'total_expense' => $totalExpense ?? 0,
        'total_stock_value' => $totalStockValue ?? 0,
        'monthly_expenses' => $monthlyExpenses,
        'monthly_revenue' => $monthlyRevenue,
        'most_sold_product' => $mostSold,
    ]);
}
}
