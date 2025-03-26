<?php

namespace App\Http\Controllers\customers;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\AddCustomerRequest;
use App\Http\Requests\admin\UpdateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::paginate(10);
        return response()->json($customers);
    }

    public function AddCustomer(AddCustomerRequest $request){
      $validated = $request->validated();

      $new_Customer = new Customer();
      $new_Customer->firstname = $validated['firstname'];
      $new_Customer->lastname = $validated['lastname'];
      $new_Customer->email = $validated['email'];
      $new_Customer->loyalty = $validated['loyalty'];
      $new_Customer->total_spent = $validated['total_spent'];
      $new_Customer->balance = $validated['balance'];
      $new_Customer->save();

      return response()->json(['message' => 'Added New Customer', 'Customer' => $new_Customer], 201);
    }

    public function update(UpdateCustomerRequest $request, $id){
      $validated = $request->validated();

      $customer = Customer::findOrFail($id);
      $customer->firstname = $validated['firstname'];
      $customer->lastname = $validated['lastname'];
      $customer->email = $validated['email'];
      $customer->loyalty = $validated['loyalty'];
      $customer->total_spent = $validated['total_spent'];
      $customer->balance = $validated['balance'];
      $customer->save();

      return response()->json(['message' => 'Customer Information Updated Successfully', 'Customer' => $customer]);
    }
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(['message' => 'Customer removed successfully']);
    }
}
