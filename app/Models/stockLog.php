<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class stockLog extends Model
{
    protected $fillable = [
        'sku_number',
        'quantity',
        'type',
        'value',
    ];
}
