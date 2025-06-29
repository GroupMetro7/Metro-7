<?php

namespace App\Http\Controllers\serviceControls;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\StockLog;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class orderListController extends Controller
{
  public function update(Request $request, $id)
  {
    $validatedList = $request->validate([
      'downpayment' => 'sometimes',
      'refNumber' => 'sometimes',
      'status' => 'sometimes',
      'cashPayment' => 'sometimes',
      'onlinePayment' => 'sometimes',
    ]);


    // Load order with tickets and get old status BEFORE updating
    $orderListUpdate = Order::with('tickets')->findOrFail($id);
    $oldStatus = $orderListUpdate->status;

    // Update the order fields
    if (isset($validatedList['downpayment'])) {
      $orderListUpdate->downpayment = $validatedList['downpayment'];
    }
    if (isset($validatedList['onlinePayment']) || isset($validatedList['downpayment'])) {
      $orderListUpdate->onlinePayment = ($validatedList['downpayment'] ?? 0) + ($validatedList['onlinePayment'] ?? 0);
    }
    if (isset($validatedList['cashPayment'])) {
      $orderListUpdate->cashPayment = $validatedList['cashPayment'];
    }
    if (isset($validatedList['refNumber'])) {
      $orderListUpdate->reference_Number = $validatedList['refNumber'];
    }
    if (isset($validatedList['status'])) {
      $orderListUpdate->status = $validatedList['status'];
    }

    $orderListUpdate->save();


    // Replace this entire section:
    // Check if status changed to completed and deduct stock
    if (strtolower($oldStatus) !== 'completed' && isset($validatedList['status']) && strtolower($validatedList['status']) === 'completed') {

      // Reload the order with tickets to ensure we have the latest data
      $tickets = Ticket::where('order_id', $id)->get();
      if ($tickets && $tickets->count() > 0) {
        $this->processStockDeductionRaw($id, $tickets);
      }
    }
  }


private function processStockDeductionRaw($orderId, $tickets)
{
    $user = Auth::user();

    foreach ($tickets as $ticket) {
        $product = Product::with('ingredients')->find($ticket->product_id);

        foreach ($product->ingredients as $ingredient) {
            $decrementAmount = $ingredient->pivot->quantity * $ticket->quantity;

            $ingredient->decrement('STOCK', $decrementAmount);
            $ingredient->save();

                StockLog::create([
                    'item_name' => $ingredient->COMPOSITE_NAME ?? 'Unknown Item',
                    'sku_number' => $ingredient->SKU_NUMBER ?? 'N/A',
                    'quantity' => -$decrementAmount,
                    'type' => 'out',
                    'value' => ($ingredient->COST_PER_UNIT ?? 0) * $decrementAmount,
                    'user_name' => $user->firstname . ' ' . $user->lastname,
                ]);
        }
    }
}
}
