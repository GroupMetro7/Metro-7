<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  protected $table = 'products';

  protected $fillable = [
    'product_name',
    'price',
    'description',
    'image',
    'category_id',
    'composite_id',
];

public function category()
{
    return $this->belongsTo(Category::class);
}


public function ingredients()
{
  return $this->belongsToMany(StockManagement::class, 'product_ingredient', 'product_id', 'ingredient_id')->withPivot('quantity')->withTimestamps();
}

public function getImageUrlAttribute()
{
    return $this->image ? asset('storage/' . $this->image) : null;
}
}
