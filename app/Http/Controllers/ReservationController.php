<?php

namespace App\Http\Controllers;

use App\Mail\ReservationEmail;
use App\Models\Order;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{

    // Display all reservations in admin page and service
    public function Reservations(){
      $reservations = Reservation::with('user')->orderBy('created_at', 'desc')->get();
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
}
