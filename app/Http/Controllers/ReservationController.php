<?php

namespace App\Http\Controllers;

use App\Mail\ReservationEmail;
use App\Models\Order;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{

    // Display all reservations in admin page and service
    public function Reservations(Request $request){
      $query = Reservation::with('user');

    if ($request->has('search') && trim($request->search)) {
      $search = trim($request->search);
      $query->where('id', 'LIKE', "%{$search}%");
    }

    $reservations = $query->orderBy('created_at', 'desc')->paginate(10);
      return response()->json($reservations);
    }

    //update the status of a reservation by admin or service
public function updateReservationStatus(Request $request, $id){
    Log::info("Update reservation status called", ['user_id' => Auth::id(), 'reservation_id' => $id, 'request' => $request->all()]);

    $user = Auth::user();
    if (!$user) {
        Log::warning("Unauthorized access attempt", ['reservation_id' => $id]);
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $validated = $request->validate([
        'status' => 'sometimes|string|in:pending,confirmed,cancelled,completed',
    ]);

    $reservation = Reservation::find($id);
    if (!$reservation) {
        Log::error("Reservation not found", ['reservation_id' => $id]);
        return response()->json(['error' => 'Reservation not found'], 404);
    }
    if (isset($validated['status'])) {
        Log::info("Updating status", ['reservation_id' => $id, 'new_status' => $validated['status']]);
        $reservation->status = $validated['status'];
    }
    $reservation->save();

    Log::info("Reservation status updated successfully", ['reservation_id' => $id, 'status' => $reservation->status]);
    return response()->json(['message' => 'Status updated', 'reservation' => $reservation]);
}

    // users reservations and pre-orders
    public function myReservations()
    {
    $user = Auth::user();
    if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    $reservations = Reservation::where('user_id', $user->id)->with('user')->orderBy('created_at', 'desc')->get();

    $preOrders = Order::with('tickets')->where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

    return response()->json([
      'reserved' => $reservations,
      'preOrders' => $preOrders,
    ]);
    }

    public function create(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $validated = $request->validate([
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'partySize' => 'required|integer|min:1',
            'reservationType' => 'required|string|max:255',
        ]);
            $reservationCount = Reservation::whereDate('date', $validated['date'])
        ->whereIn('status', ['pending', 'confirmed'])
        ->sum('party_size');

    $maxCapacity = 50; // Same as in checkAvailability function
    $remainingCapacity = $maxCapacity - $reservationCount;

    // Check if the new party size would exceed capacity
    if ($validated['partySize'] > $remainingCapacity) {
        return response()->json([
            'error' => 'Capacity exceeded',
            'message' => "Cannot accommodate party of {$validated['partySize']}. Only {$remainingCapacity} spots remaining for this date.",
            'capacity_used' => $reservationCount,
            'max_capacity' => $maxCapacity,
            'remaining_capacity' => $remainingCapacity
        ], 422);
    }

        $validated = Reservation::create([
            'user_id' => $user->id,
            'date' => $validated['date'],
            'time' => $validated['time'],
            'party_size' => $validated['partySize'],
            'reservation_type' => $validated['reservationType'],
        ]);

        Mail::to($user->email)->send(new ReservationEmail($user, $validated));
        return response()->json(['message' => 'Reservation created successfully', 'reservation' => $validated], 201);
    }

    public function deleteReservation($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $reservation = Reservation::find($id);
        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], 404);
        }

        if ($reservation->user_id !== $user->id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $reservation->delete();
        return response()->json(['message' => 'Reservation deleted successfully']);
    }

    public function checkAvailability(Request $request)
{
    $date = $request->input('date');
    $month = $request->input('month');
    $year = $request->input('year');

    // If checking specific date
    if ($date) {
        $reservationCount = Reservation::whereDate('date', $date)
            ->whereIn('status', ['pending', 'confirmed'])
            ->sum('party_size');

        // Assuming max capacity per day is 100 (adjust as needed)
        $maxCapacity = 50;
        $isAvailable = $reservationCount < $maxCapacity;

        return response()->json([
            'available' => $isAvailable,
            'capacity_used' => $reservationCount,
            'max_capacity' => $maxCapacity
        ]);
    }

    // If checking month availability
    if ($month && $year) {
        $startDate = Carbon::create($year, $month, 1)->startOfMonth();
        $endDate = Carbon::create($year, $month, 1)->endOfMonth();

        $reservations = Reservation::whereBetween('date', [$startDate, $endDate])
            ->whereIn('status', ['pending', 'confirmed'])
            ->selectRaw('DATE(date) as reservation_date, SUM(party_size) as total_party_size')
            ->groupBy('reservation_date')
            ->get();

        $availability = [];
        $maxCapacity = 50; // Adjust as needed

        foreach ($reservations as $reservation) {
            $availability[$reservation->reservation_date] = [
                'available' => $reservation->total_party_size < $maxCapacity,
                'capacity_used' => $reservation->total_party_size,
                'max_capacity' => $maxCapacity
            ];
        }

        return response()->json($availability);
    }

    return response()->json(['error' => 'Invalid parameters'], 400);
}
}
