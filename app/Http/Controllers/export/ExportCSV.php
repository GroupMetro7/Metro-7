<?php

namespace App\Http\Controllers\export;

use App\Http\Controllers\Controller;
use App\Models\StockLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExportCSV extends Controller
{
  public function exportCSV()
  {
    $activityLogs = StockLog::all();
    return response()->json($activityLogs);
  }
}
