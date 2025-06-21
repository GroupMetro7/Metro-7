<?php

namespace App\Models;

use App\Mail\OutOfStockNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use App\Models\User;

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

    static::updated(function ($stockItem){
      if($stockItem->STOCK <= 0 && $stockItem->getOriginal('STOCK') > 0){
        $admins = User::where('role', 'admin')->get();
        foreach($admins as $admin){
          Mail::to($admin->email)->send(new OutOfStockNotification($stockItem));
        }
      }
    });

    static::saved(function ($model) {
        // If the ingredient is unavailable, update related products
        if ($model->STATUS === 'Unavailable') {
            foreach ($model->products as $product) {
                $product->is_available = false;
                $product->save();
            }
        } elseif ($model->STATUS !== 'Unavailable') {
          foreach ($model->products as $product) {
                $product->is_available = true;
                $product->save();
          }
        }
    });
}



public function products()
{
  return $this->belongsToMany(Product::class, 'product_ingredient', 'ingredient_id', 'product_id')->withPivot('quantity')->withTimestamps();
}

public function category()
{
    return $this->belongsTo(Category::class);
}
}
