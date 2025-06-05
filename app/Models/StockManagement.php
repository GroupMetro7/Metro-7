<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockManagement extends Model
{
  use HasFactory;

  protected $fillable = [
    'SKU_NUMBER',
    'COMPOSITE_NAME',
    'category_id',
    'STOCK',
    'COST_PER_UNIT',
    'STOCK_VALUE',
    'STATUS',
    'SOLD_BY',
];

protected static function boot()
{
    parent::boot();

    static::saving(function ($model) {
        if ($model->STOCK <= 0) {
            $model->STATUS = 'Unavailable';
        } elseif ($model->STOCK <= 15) {
            $model->STATUS = 'Warning';
        } else {
            $model->STATUS = 'Available';
        }

        $model->STOCK_VALUE = $model->STOCK * $model->COST_PER_UNIT;

        if (isset($model->SOLD_BY) && $model->SOLD_BY === 'each') {
            $model->STOCK = (int) $model->STOCK;
        }
    });

}



public function products()
{
  return $this->belongsToMany(product::class, 'product_ingredient', 'ingredient_id', 'product_id')->withPivot('quantity')->withTimestamps();
}

public function category()
{
    return $this->belongsTo(Category::class);
}
}
