<?php

use App\Http\Controllers\AdminController\RetrieveDataController;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\ForgotPassword;
use App\Http\Controllers\api\ResetPassword;
use App\Http\Controllers\api\StockManagementController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\export\ExportCSV;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\serviceControls\orderListController;
use App\Http\Controllers\serviceControls\perfomanceStats;
use App\Http\Controllers\serviceControls\serviceController;
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
Route::post('/forgot-password', [ForgotPassword::class, 'sendResetLinkEmail']);
Route::post('/reset-password', [ResetPassword::class, 'reset']);

//Stock Management
Route::get('/products', [StockManagementController::class, 'index']);
Route::get('/ingredients', [StockManagementController::class, 'ingredients']);
Route::middleware('auth:sanctum')->post('/products', [StockManagementController::class, 'AddProduct']);
Route::middleware('auth:sanctum')->delete('/products/{id}', [StockManagementController::class, 'destroy']);
Route::middleware('auth:sanctum')->put('/products/{id}', [StockManagementController::class, 'update']);


//Employee Management
Route::get('/employees', [AuthController::class, 'index']);


//Customer Management
Route::get('/customers', [AuthController::class, 'index_customer']);

// products operations
// Route::get('/menu', [ProductController::class, 'index']);
Route::get('/adminmenu', [ProductController::class, 'adminindex']);
Route::post('/menu', [ProductController::class, 'store']);
Route::put('/menu/{id}', [ProductController::class, 'update']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/order/search', [OrderController::class, 'search']);
Route::delete('/menu/{id}', [ProductController::class, 'destroy']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
Route::put('/categories/{id}', [CategoryController::class, 'updateCategory']);
Route::get('/products/category/{categoryId}', [ProductController::class, 'byCategory']);
Route::post('/createCategory', [CategoryController::class, 'create']);

Route::middleware('auth:sanctum')->post('/orders', [OrderController::class, 'store']);
Route::get('/orders', [OrderController::class, 'index']);

Route::get('/dashboard-data', [RetrieveDataController::class, 'AdminData']);
Route::get('/sales-product-revenue', [RetrieveDataController::class, 'salesProductRevenue']);
Route::get('/completed-order', [RetrieveDataController::class, 'index']);



// service controls
Route::get('/menuData', [serviceController::class, 'index']);
Route::middleware('auth:sanctum')->put('/orderList/{id}', [orderListController::class, 'update']);
Route::middleware('auth:sanctum')->get('/weekly-orders', [perfomanceStats::class, 'getPerformanceStats']);

//reservation
Route::middleware('auth:sanctum')->post('/createReservation', [ReservationController::class, 'create']);
Route::middleware('auth:sanctum')->get('/myReservations', [ReservationController::class, 'myReservations']);
Route::get('/reservations', [ReservationController::class, 'Reservations']);
Route::middleware('auth:sanctum')->put('/update-Reservation-Status/{id}', [ReservationController::class, 'updateReservationStatus']);



//attendance
Route::middleware('auth:sanctum')->get('/admin/staff-attendance-status', [AttendanceController::class, 'staffAttendanceStatus']);
Route::middleware('auth:sanctum')->post('/attendance/time-in', [AttendanceController::class, 'timeIn']);
Route::middleware('auth:sanctum')->post('/attendance/time-out', [AttendanceController::class, 'timeOut']);

// customer order
Route::middleware('auth:sanctum')->post('/create-order-Customer', [OrderController::class, 'storeCustomerOrder']);


// stocklog
Route::get('/stock-logs', [RetrieveDataController::class, 'getStockLogs']);

// AI
Route::get('/FetchAIData', [RetrieveDataController::class, 'getTicketsData']);


//export files
Route::get('/export-logs', [ExportCSV::class, 'exportCSV']);
