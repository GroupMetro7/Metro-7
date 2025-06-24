<?php

namespace Database\Factories;

use App\Models\Ticket;
use Illuminate\Database\Eloquent\Factories\Factory;

class TicketFactory extends Factory
{
    protected $model = Ticket::class;

    public function definition(): array
    {
        $unitPrice = $this->faker->randomFloat(2, 100, 5000);
        $quantity = $this->faker->numberBetween(1, 10);

        return [
            'order_id' => $this->faker->numberBetween(1, 20),
            'product_id' => $this->faker->unique()->numberBetween(1000, 9999),
            'product_name' => $this->faker->words(3, true),
            'quantity' => $quantity,
            'unit_price' => $unitPrice,
            'total_price' => $unitPrice * $quantity,
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}


