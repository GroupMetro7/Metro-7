<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\StockManagementController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\IngredientsController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\serviceControls\serviceController;
use App\Models\StockManagement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// needs grooming

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
  Route::put('/updateUserByAdmin/{id}', [AuthController::class, 'updateUserByAdmin']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->put('/user', [AuthController::class, 'updateUser']);

//Stock Management
Route::get('/products', [StockManagementController::class, 'index']);
Route::get('/ingredients', [StockManagementController::class, 'ingredients']);
Route::post('/products', [StockManagementController::class, 'AddProduct']);
Route::delete('/products/{id}', [StockManagementController::class, 'destroy']);
Route::put('/products/{id}', [StockManagementController::class, 'update']);


//Employee Management
Route::get('/employees', [AuthController::class, 'index']);


//Customer Management
Route::get('/customers', [AuthController::class, 'index_customer']);

// products operations
// Route::get('/menu', [ProductController::class, 'index']);
Route::get('/adminmenu', [ProductController::class, 'adminindex']);
Route::post('/menu', [ProductController::class, 'store']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/order/search', [OrderController::class, 'search']);
Route::delete('/menu/{id}', [ProductController::class, 'destroy']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/products/category/{categoryId}', [ProductController::class, 'byCategory']);
Route::post('/createCategory', [CategoryController::class, 'create']);

Route::middleware('auth:sanctum')->post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);

Route::get('/monthlyRevenue', [OrderController::class, 'monthlyRevenue']);
Route::get('/showExpenses', [StockManagementController::class, 'showExpense']);


// service controls
Route::get('/menuData', [serviceController::class, 'index']);
