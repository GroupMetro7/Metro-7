<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
  protected $fillable = [
    'order_id',
    'product_id',
    'quantity',
    'unit_price',
    'total_price'
  ];

  public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
