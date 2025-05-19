<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\StaffLoginRequest;
use App\Http\Requests\admin\StaffRegisterRequest;
use App\Http\Requests\cxUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
  public function index()
    {
      $employees = User::where('role', 'employee')->paginate(2);
      return response()->json($employees);
    }

    public function index_customer()
    {
      $employees = User::where('role', 'customer')->paginate(2);
      return response()->json($employees);
    }

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

  public function updateUser(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'contact' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Update the user's profile
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->contact = $request->contact;
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user,
        ], 200);
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


  public function updateUserByAdmin(Request $request, $id)
{
    // Get the authenticated user
    $admin = Auth::user();

    if($admin->isAdmin()){
      $validated = $request->validate([
        'firstname' => 'required|string|max:255',
        'lastname' => 'required|string|max:255',
        'role' => 'required',
    ]);

    // Find the user to be updated
    $user = User::findOrFail($id);

    // Update the user's profile
    $user->update($validated);

    return response()->json([
        'message' => 'User information updated successfully.',
        'user' => $user,
    ], 200);
    }else {
      return response()->json(['message' => 'Unauthorized. Only admins can perform this action.'], 403);
    }

}
}


