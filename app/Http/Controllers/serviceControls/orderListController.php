<?php

namespace App\Http\Controllers\serviceControls;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

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

        $orderListUpdate = Order::findOrFail($id);
        $orderListUpdate->downpayment = $validatedList['downpayment'];
        $orderListUpdate->onlinePayment = $validatedList['downpayment'] + $validatedList['onlinePayment'];
        $orderListUpdate->cashPayment = $validatedList['cashPayment'];
        $orderListUpdate->reference_Number = $validatedList['refNumber'];
        $orderListUpdate->status = $validatedList['status'];
        $orderListUpdate->update();

        return response()->json(['message' => 'Order updated successfully', 'Order' => $orderListUpdate]);
    }
}
