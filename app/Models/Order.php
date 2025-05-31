<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  protected $fillable = [
    'name',
    'status',
    'amount',
    'order_number',
    'option',
    'discount',
    'downpayment',
    'reference_Number',
  ];

  protected $casts = [
    'tickets' => 'array',
  ];

  public function tickets(){
    return $this->hasMany(Ticket::class);
  }
}
