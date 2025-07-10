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
    'margin'
];

  protected $appends = ['total_ingredient_cost', 'calculated_margin'];

  public function getTotalIngredientCostAttribute()
  {
      $totalCost = 0;
      foreach ($this->ingredients as $ingredient) {
          $totalCost += ($ingredient->COST_PER_UNIT * $ingredient->pivot->quantity);
      }
      return $totalCost;
  }

    public function getCalculatedMarginAttribute()
  {
      return $this->price - $this->total_ingredient_cost;
  }

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
