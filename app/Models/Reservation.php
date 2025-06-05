<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'user_id',
        'date',
        'time',
        'party_size',
        'reservation_type',
    ];

    public function user()
{
    return $this->belongsTo(User::class);
}

}
