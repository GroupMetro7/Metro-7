<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class employee extends Model
{
    protected $fillable = [
      'name',
      'employee_number',
      'email',
      'phone',
      'username',
      'role',
      'schedule',
      'time'
    ];
}
