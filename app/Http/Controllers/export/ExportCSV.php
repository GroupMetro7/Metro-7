<?php

namespace App\Http\Controllers\export;

use App\Http\Controllers\Controller;
use App\Models\StockLog;
use App\Models\StockManagement;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExportCSV extends Controller
{
  public function exportCSV(Request $request)
  {
    $startDate = $request->query('startDate');
    $endDate = $request->query('endDate');

    $activityLogs = StockLog::query();
    $inventory = StockManagement::query();
    $salesReports = Ticket::with('order');

    if ($startDate) {
      $activityLogs->whereDate('created_at', '>=', $startDate);
      $inventory->whereDate('created_at', '>=', $startDate);
      $salesReports->whereDate('created_at', '>=', $startDate);
    }
    if ($endDate) {
      $activityLogs->whereDate('created_at', '<=', $endDate);
      $inventory->whereDate('created_at', '<=', $endDate);
      $salesReports->whereDate('created_at', '<=', $endDate);
    }

    return response()->json([
      'salesReports' => $salesReports->get(),
      'activityLogs' => $activityLogs->get(),
      'inventory' => $inventory->get(),
    ]);
  }
}