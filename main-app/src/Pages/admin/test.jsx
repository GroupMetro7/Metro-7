import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";

export default function OrderSystem() {
  const [menuItems, setMenuItems] = useState([]);
  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axiosClient.get("/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  // Add item to the order
  const addItemToOrder = (item) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    let updatedOrder;
    if (existingItem) {
      updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      updatedOrder = [...order, { ...item, quantity: 1 }];
    }
    setOrder(updatedOrder);
    calculateTotalPrice(updatedOrder);
  };

  // Remove item from the order
  const removeItemFromOrder = (itemId) => {
    const updatedOrder = order
      .map((orderItem) =>
        orderItem.id === itemId && orderItem.quantity > 1
          ? { ...orderItem, quantity: orderItem.quantity - 1 }
          : orderItem
      )
      .filter((orderItem) => orderItem.quantity > 0);
    setOrder(updatedOrder);
    calculateTotalPrice(updatedOrder);
  };

  // Calculate total price
  const calculateTotalPrice = (updatedOrder) => {
    const total = updatedOrder.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Submit the order
  const submitOrder = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    try {
      const formattedOrder = {
        status: 'pending',
        tickets: order.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
        })),
        total_price: totalPrice,
      };

      console.log("Submitting order:", formattedOrder);
      await axiosClient.post("/orders", formattedOrder);
      alert("Order submitted successfully!");
      setOrder([]); // Clear the order
      setTotalPrice(0); // Reset total price
    } catch (error) {
      console.error("Failed to submit order:", error);
      alert("Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="order-system">
      <h1>Menu</h1>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <h3>{item.product_name}</h3>
            <p>₱{item.price}</p>
            <button onClick={() => addItemToOrder(item)}>Add to Order</button>
          </div>
        ))}
      </div>
      <form onSubmit={submitOrder}>
        <h2>Order Summary</h2>
        <div className="order-summary">
          {order.length === 0 ? (
            <p>No items in the order.</p>
          ) : (
            order.map((item) => (
              <div key={item.id} className="order-item">
                <h3>{item.product_name}</h3>
                <p>
                  ₱{item.price} x {item.quantity}
                </p>
                <button onClick={() => removeItemFromOrder(item.id)}>-</button>
                <button onClick={() => addItemToOrder(item)}>+</button>
              </div>
            ))
          )}
        </div>
        <h3>Total Price: ₱{totalPrice}</h3>
        <button disabled={order.length === 0}>Submit Order</button>
      </form>
    </div>
  );
}
