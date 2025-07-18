<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;


Route::get('/authverify-email/{verification_code}', [AuthController::class, 'verify_email'])
    ->name('verify_email');

Route::get('/change_password/{token}', function ($token) {
    $email = request()->query('email');
    return redirect("https://metro7.shop/change_password/{$token}?email={$email}");
})->name('password.reset');

