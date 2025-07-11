<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StockLog extends Model
{
    protected $fillable = [
        'sku_number',
        'quantity',
        'type',
        'value',
        'item_name',
        'user_name',
        'remarks'
    ];
}
