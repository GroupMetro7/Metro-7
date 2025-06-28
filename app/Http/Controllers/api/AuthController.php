<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\StaffLoginRequest;
use App\Http\Requests\admin\StaffRegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\URL;
use Mail;
use Illuminate\Support\Str;
use App\Mail\EmailVerificationMail;
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
            if (is_null($user->email_verified_at)) {
    // Email not verified
    return response()->json(['message' => 'Please verify your email before logging in.'], 403);
}
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
              'email_verification_code' => Str::random(40)
          ]);

          Mail::to($user->email)->send(new EmailVerificationMail($user));


          // $token = $user->createToken('main')->plainTextToken;

          // return response()->json([
          //     'user' => $user,
          //     'token' => $token,


          // ], 201);



      } catch (\Exception $e) {
          Log::error('Error during registration: ' . $e->getMessage());
          return response()->json([
              'message' => 'Registration failed, please try again.',
              'error' => $e->getMessage()
          ], 500);
      }
  }

  public function updateUser(Request $request)
    {
      $user = Auth::user();
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'contact' => 'required|integer',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Get the authenticated user


        // Update the user's profile
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->contact = $request->contact;
        $user->email = $request->email;
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully.',
            'user' => $user,
        ], 200);
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
        'loyalty' => 'required',
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
  public function logout(Request $request)
  {
      /** @var User $user */
      $user = $request->user();
      if ($user) {
          $user->currentAccessToken()->delete();
      }

      return response()->json(['message' => 'Logged out successfully'], 200);
  }

public function verify_email($verification_code)
{
    $user = User::where('email_verification_code', $verification_code)->first();

    if (!$user) {
        return redirect(env('FRONTEND_URL'))->with('error', 'Invalid verification code.');
    }

    if ($user->email_verified_at) {
        return redirect(env('FRONTEND_URL'))->with('message', 'Email already verified.');
    }
    // Mark the email as verified
    $user->email_verified_at = now();
    $user->save();

    return redirect(env('FRONTEND_URL'))->with('message', 'Email verified successfully.');
}
}
