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
  public function exportCSV()
  {
    $activityLogs = StockLog::all();
    $inventory = StockManagement::all();
    $salesReports = Ticket::with('order')->get();

    return response()->json([
      'salesReports' => $salesReports,
      'activityLogs' => $activityLogs,
      'inventory' => $inventory,
    ]);
  }
}