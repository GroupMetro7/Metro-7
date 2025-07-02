<?php

namespace App\Http\Controllers\serviceControls;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;

class perfomanceStats extends Controller
{
    public function getPerformanceStats(Request $request)
    {
        $dailyStats = Order::where('user_id', $request->user()->id)
            ->where('status', 'completed')
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->selectRaw('DATE(created_at) as date, COUNT(*) as order_count')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        // Get daily attendance for the last 7 days
        $dailyAttendance = Attendance::where('user_id', $request->user()->id)
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->selectRaw('DATE(created_at) as date,
                        MIN(time_in) as time_in,
                        MAX(time_out) as time_out,
                        COUNT(*) as attendance_count,
                        CASE
                            WHEN MIN(time_in) IS NOT NULL THEN "Present"
                            ELSE "Absent"
                        END as status')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        // Calculate attendance rate for the week
        $totalWorkDays = 7;
        $presentDays = $dailyAttendance->where('status', 'Present')->count();
        $attendanceRate = ($presentDays / $totalWorkDays) * 100;

        return response()->json([
            'daily_stats' => $dailyStats,
            'order_count_weekly' => $dailyStats->sum('order_count'),
            'daily_attendance' => $dailyAttendance,
            'attendance_summary' => [
                'total_work_days' => $totalWorkDays,
                'present_days' => $presentDays,
                'absent_days' => $totalWorkDays - $presentDays,
                'attendance_rate' => round($attendanceRate, 2)
            ]
        ]);
    }
}
