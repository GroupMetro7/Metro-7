<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\StaffLoginRequest;
use App\Http\Requests\admin\StaffRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
  public function login(StaffLoginRequest $request)
  {
    $credentials = $request->validated();

      if (!Auth::attempt($credentials)) {
          return response([
              'message' => 'Provided Email or Password is incorrect'
          ], 401);
      }

      /** @var User $user */
      $user = Auth::user();
      $token = $user->createToken('main')->plainTextToken;

      return response()->json([
        'user' => $user,
        'token' => $token
    ]);
  }

  public function register(StaffRegisterRequest $request)
  {
      try {
          $data = $request->validated();
          $user = User::create([
              'lastname' => $data['lastname'],
              'firstname' => $data['firstname'],
              'email' => $data['email'],
              'contact' => $data['contact'],
              'password' => bcrypt($data['password']),
          ]);

          $token = $user->createToken('main')->plainTextToken;

          return response()->json([
              'user' => $user,
              'token' => $token
          ]);
      } catch (\Exception $e) {
          Log::error('Error during registration: ' . $e->getMessage());
          return response()->json([
              'message' => 'Registration failed, please try again.'
          ], 500);
      }
  }

  public function logout(Request $request)
  {
      /** @var User $user */
      $user = $request->user();
      if ($user) {
          $user->currentAccessToken()->delete();
      }

      return response()->json(['message' => 'Logged out successfully'], 200);
  }
}
