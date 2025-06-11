<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\admin\AddEmployeeRequest;
use App\Models\employee;
use App\Models\User;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
      $employees = employee::paginate(10);
      return response()->json($employees);
    }

    public function AddEmployee(AddEmployeeRequest $request)
    {
      $validated = $request->validated();

      $new_Employee = new employee();
      $new_Employee->name = $validated['name'];
      $new_Employee->employee_number = $this->generateEmployeeNumber();
      $new_Employee->email = $validated['email'];
      $new_Employee->phone = $validated['phone'];
      $new_Employee->username = $validated['username'];
      $new_Employee->role = $validated['role'];
      $new_Employee->schedule = $validated['schedule'];
      $new_Employee->time = $validated['time'];
      $new_Employee->save();

      return response()->json(['message' => 'Added New Employee', 'Employee' => $new_Employee], 201);
    }

    private function generateEmployeeNumber()
    {
      $lastEmployee = employee::orderBy('id', 'desc')->first();
      $lastNumber = $lastEmployee ? intval(substr($lastEmployee->employee_number, -4)) : 0;
      $newNumber = str_pad($lastNumber + 1, 4, '0', STR_PAD_LEFT);

      return 'EMP' . $newNumber;
    }

    public function update(Request $request, $id){
      $validated = $request->validate([
        'firstname' => 'sometimes|required|string|max:255',
    ]);

      $employee = User::findOrFail($id);
      $employee->firstname = $validated['firstname'];
      $employee->save();

      return response()->json(['message' => 'Employee updated successfully', 'Employee' => $employee]);
    }

    public function destroy($id)
    {
        $product = employee::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
