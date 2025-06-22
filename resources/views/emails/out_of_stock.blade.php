@component('mail::message')
# Out of Stock Notification

The Item from inventory **{{ $StockItem->COMPOSITE_NAME }} ({{ $StockItem->SKU_NUMBER }})** is currently out of stock.
Please take the necessary actions to replenish the stock.

Thanks,
Your Metro 7 Inventory
@endcomponent
