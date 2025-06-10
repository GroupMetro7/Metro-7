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
    'cashPayment',
    'onlinePayment',
    'reference_Number',
    'user_id',
  ];

  protected $casts = [
    'tickets' => 'array',
  ];

  public function tickets(){
    return $this->hasMany(Ticket::class);
  }
}
