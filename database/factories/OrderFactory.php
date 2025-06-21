<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Validation\Rules\Unique;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'order_number' => $this->faker->unique()->numberBetween(100000, 999999),
            // 'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
