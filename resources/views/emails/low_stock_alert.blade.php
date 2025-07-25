@component('mail::message')
# Low on Stock Notification

The Item from inventory **{{ $StockItem->COMPOSITE_NAME }} ({{ $StockItem->SKU_NUMBER }})** is Low on stock {{ $StockItem->STOCK }}.

Thanks,
Your Metro 7 Inventory
@endcomponent
