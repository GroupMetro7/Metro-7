<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
  protected $table= 'transactions';

  protected $fillable = [
    'order_id',
    'amount',
    'balance',
    'paid_amount',
    'payment_method',
    'user_id',
    'transaction_date',
    'reference',
  ];
}
