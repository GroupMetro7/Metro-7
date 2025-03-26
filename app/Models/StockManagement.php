<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockManagement extends Model
{
  use HasFactory;

  protected $fillable = [
    'SKU_NUMBER',
    'ITEM_NAME',
    'CATEGORY',
    'STOCK',
    'COST_PER_UNIT',
    'STOCK_VALUE',
    'STATUS',
];

protected static function boot()
{
    parent::boot();

    static::saving(function ($Model) {
        if ($Model->STOCK === '0') {
            $Model->STATUS = 'Unavailable';
        }elseif($Model->STOCK <= 15){
            $Model->STATUS = 'Warning';
        }else {
          $Model->STATUS = 'Available';
        }
    });
}
}
