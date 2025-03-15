<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\InventoryManagementController;
use App\Http\Controllers\UserController;
use App\Models\InventoryManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// User Authentications

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->put('/user', [UserController::class, 'update']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

//Inventory
Route::get('/products', [InventoryManagementController::class, 'index']);
Route::post('/products', [InventoryManagementController::class, 'AddProduct']);
Route::post('/products/{id}/update-stock', [InventoryManagementController::class, 'updateStock']);