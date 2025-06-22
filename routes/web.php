<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;


Auth::routes();
Route::get('/authverify-email/{verification_code}', [AuthController::class, 'verify_email'])
    ->name('verify_email');