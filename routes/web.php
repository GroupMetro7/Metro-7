<?php

use App\Mail\OutOfStockNotification;
use App\Models\StockManagement;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

