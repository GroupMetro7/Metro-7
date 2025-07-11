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
    'total_price',
    'product_name',
    'cost'
  ];

public function order()
{
    return $this->belongsTo(Order::class, 'order_id', 'id');
}
}