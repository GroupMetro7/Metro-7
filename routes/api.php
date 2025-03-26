<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\StockManagementController;
use App\Http\Controllers\api\EmployeeController;
use App\Http\Controllers\customers\CustomerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

//Stock Management
Route::get('/products', [StockManagementController::class, 'index']);
Route::post('/products', [StockManagementController::class, 'AddProduct']);
Route::delete('/products/{id}', [StockManagementController::class, 'destroy']);
Route::put('/products/{id}', [StockManagementController::class, 'update']);

//Employee Management
Route::get('/employees' , [EmployeeController::class, 'index']);
Route::post('/employees', [EmployeeController::class, 'AddEmployee']);
Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
Route::put('/employees/{id}', [EmployeeController::class, 'update']);


//Customer Management
Route::get('/customers', [CustomerController::class, 'index']);
Route::post('/customers', [CustomerController::class, 'AddCustomer']);
Route::put('/customers/{id}', [CustomerController::class, 'update']);
Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);
