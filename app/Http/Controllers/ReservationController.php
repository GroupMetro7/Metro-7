<?php

namespace App\Http\Controllers;

use App\Mail\ReservationEmail;
use App\Models\Order;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
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
