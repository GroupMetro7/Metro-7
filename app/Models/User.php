<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
  use HasApiTokens, HasFactory, Notifiable;

  protected $fillable = [
    'lastname',
    'firstname',
    'email',
    'contact',
    'password',
    'email_verification_code',
    'role',
    'loyalty'
  ];

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  /**
   * Check if the user is an admin.
   *
   * @return bool
   */
  public function isAdmin()
  {
    return $this->role === 'admin';
  }

  public function attendances()
  {
    return $this->hasMany(Attendance::class);
  }
}
