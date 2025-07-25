<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AttendanceController extends Controller
{
  public function staffAttendanceStatus()
  {
    $users = User::where('role', 'employee')
      ->with(['attendances' => function ($q) {
        $q->whereDate('time_in', now()->toDateString())
          ->latest();
      }])
      ->get();

    $data = $users->map(function ($user) {
      $todayAttendance = $user->attendances->first();

      // Check if user timed in today and hasn't timed out yet
      $timedIn = $todayAttendance &&
        $todayAttendance->time_in &&
        $todayAttendance->time_out === null;

      return [
        'id' => $user->id,
        'name' => $user->firstname . ' ' . $user->lastname,
        'timed_in' => $timedIn,
        'attendance_today' => $todayAttendance ? [
          'time_in' => $todayAttendance->time_in,
          'time_out' => $todayAttendance->time_out,
        ] : null,
      ];
    });

    return response()->json($data);
  }

  public function timeIn()
  {
    $user = Auth::user();
    if (!$user) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    // Check if the user has already timed in today
    $alreadyTimedIn = Attendance::where('user_id', $user->id)
      ->whereDate('time_in', now()->toDateString())
      ->exists();

    if ($alreadyTimedIn) {
      return response()->json(['error' => 'You have already timed in today.'], 409);
    }

    $attendance = Attendance::create([
      'user_id' => $user->id,
      'time_in' => now(),
    ]);

    return response()->json(['message' => 'Time in recorded', 'attendance' => $attendance]);
  }
  public function timeOut()
  {
    $user = Auth::user();
    if (!$user) {
      return response()->json(['error' => 'Unauthorized'], 401);
    }

    $attendance = Attendance::where('user_id', $user->id)
      ->whereNull('time_out')
      ->latest()
      ->first();

    if (!$attendance) {
      return response()->json(['error' => 'No active attendance found'], 404);
    }

    $attendance->update(['time_out' => now()]);

    return response()->json(['message' => 'Time out recorded', 'attendance' => $attendance]);
  }
}
