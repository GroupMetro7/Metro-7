{{-- filepath: c:\Users\LENOVO\Desktop\main\Metro-7\resources\views\emails\order_notification.blade.php --}}
    <h1>Thank you for your order, {{ $user->firstname }}!</h1>
    <p>Your order number is: <strong>{{ $order->order_number }}</strong></p>
    <p>Order Amount: {{ $order->amount }}</p>
    <p>Order Date: {{ $order->created_at->format('Y-m-d H:i:s') }}</p>
    <p>Please check your profile for more details.</p>
    <p>Thank you for ordering!</p>
    
    