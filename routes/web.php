<?php

use App\Mail\OutOfStockNotification;
use App\Models\StockManagement;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/test-email', function () {
    $product = StockManagement::first(); // or mock a new product object
    if ($product) {
        Mail::to('m.lim271999@gmail.com')->send(new OutOfStockNotification($product));
        return 'Test email sent!';
    }

    return 'No product found.';
});
