<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  protected $fillable = [
    'name',
    'status',
  ];

  protected $casts = [
    'tickets' => 'nullable|array',
  ];
  
  public function tickets(){
    return $this->hasMany(Ticket::class);
  }
}
