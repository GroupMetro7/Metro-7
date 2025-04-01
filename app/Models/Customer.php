<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
      'firstname',
      'lastname',
      'email',
      'total_spent',
      'balance',
      'loyalty',
    ];
}
