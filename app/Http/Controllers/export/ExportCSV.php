<?php

namespace App\Http\Controllers\export;

use App\Http\Controllers\Controller;
use App\Models\StockLog;
use App\Models\StockManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExportCSV extends Controller
{
  public function exportCSV()
  {
    $activityLogs = StockLog::all();
    $inventory = StockManagement::all();
    return response()->json([
      'activityLogs' => $activityLogs,
      'inventory' => $inventory,
    ]);
  }
}
