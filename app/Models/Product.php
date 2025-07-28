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
    'margin',
    'quantity'
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

//getting the estimated quantity of the product that can be made

public function getEstimatedQuantity() {
  $minQuantity = null;

  foreach ($this->ingredients as $ingredient) {
    $requiredQuantity = $ingredient->pivot->quantity;
    $availableStock = $ingredient->STOCK;

    if ($requiredQuantity > 0) {
      $possibleQuantity = floor($availableStock / $requiredQuantity);

      if ($minQuantity === null || $possibleQuantity < $minQuantity) {
        $minQuantity = $possibleQuantity;
      }
    }
  }

  return $minQuantity ?? 0;
}

// updates the quantity column in the products table
public function updateEstimatedQuantity() {
  $estimatedQuantity = $this->getEstimatedQuantity();

  $this->update(['quantity' => $estimatedQuantity]);

  return $estimatedQuantity;
}

// Method to update all products' estimated quantities
public static function updateAllEstimatedQuantities() {
  $products = self::with('ingredients')->get();

  foreach ($products as $product) {
    $product->updateEstimatedQuantity();
  }

  return $products->count();
}

public static function validateOrderFeasibility($orderItems) {
    $ingredientUsage = [];

    // Calculate total ingredient usage across all ordered items
    foreach ($orderItems as $item) {
        $product = self::with('ingredients')->find($item['product_id']);
        $quantity = $item['quantity'];

        foreach ($product->ingredients as $ingredient) {
            $requiredAmount = $ingredient->pivot->quantity * $quantity;

            if (!isset($ingredientUsage[$ingredient->id])) {
                $ingredientUsage[$ingredient->id] = 0;
            }

            $ingredientUsage[$ingredient->id] += $requiredAmount;
        }
    }

    // Check if we have enough stock for each ingredient
    $conflicts = [];
    foreach ($ingredientUsage as $ingredientId => $totalRequired) {
        $ingredient = \App\Models\StockManagement::find($ingredientId);

        if ($ingredient->STOCK < $totalRequired) {
            $conflicts[] = [
                'ingredient' => $ingredient->INGREDIENT_NAME,
                'required' => $totalRequired,
                'available' => $ingredient->STOCK,
                'shortage' => $totalRequired - $ingredient->STOCK
            ];
        }
    }

    return [
        'feasible' => empty($conflicts),
        'conflicts' => $conflicts
    ];
}

// Get maximum possible quantity considering current cart
public function getMaxQuantityWithCart($currentCart = []) {
    $ingredientUsage = [];

    // Calculate current usage from cart
    foreach ($currentCart as $cartItem) {
        if ($cartItem['product_id'] != $this->id) {
            $cartProduct = self::with('ingredients')->find($cartItem['product_id']);
            foreach ($cartProduct->ingredients as $ingredient) {
                $used = $ingredient->pivot->quantity * $cartItem['quantity'];
                $ingredientUsage[$ingredient->id] = ($ingredientUsage[$ingredient->id] ?? 0) + $used;
            }
        }
    }

    // Calculate remaining capacity for this product
    $minQuantity = null;

    foreach ($this->ingredients as $ingredient) {
        $requiredQuantity = $ingredient->pivot->quantity;
        $alreadyUsed = $ingredientUsage[$ingredient->id] ?? 0;
        $availableStock = $ingredient->STOCK - $alreadyUsed;

        if ($requiredQuantity > 0) {
            $possibleQuantity = floor($availableStock / $requiredQuantity);

            if ($minQuantity === null || $possibleQuantity < $minQuantity) {
                $minQuantity = $possibleQuantity;
            }
        }
    }

    return max(0, $minQuantity ?? 0);
}

}
