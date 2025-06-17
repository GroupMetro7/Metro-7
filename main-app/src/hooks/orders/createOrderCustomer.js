import { useState } from "react";
import axiosClient from "../../axiosClient";

export default function useCreateOrder() {
  //variables
  const [formData, setFormData] = useState({
    totalPrice: "",
    downpayment: "",
    refNumber: "",
  });
  const [order, setOrder] = useState([]);
  const [diningOpt, setDiningOpt] = useState();
  const [discount, setDiscount] = useState(0);

  //function
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

  const calculateTotalPrice = (updatedOrder) => {
    const total = updatedOrder.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setFormData((prev) => ({ ...prev, totalPrice: total }));
  };

  const removeItemFromOrder = (itemId) => {
    const updatedOrder = order
      .map((orderItem) =>
        orderItem.id === itemId && orderItem.quantity > 1
          ? { ...orderItem, quantity: orderItem.quantity - 1 }
          : orderItem.id === itemId
          ? null
          : orderItem
      )
      .filter((orderItem) => orderItem !== null);
    setOrder(updatedOrder);
    calculateTotalPrice(updatedOrder);
  };

  const submitOrder = async (e) => {
    e.preventDefault();
    if (!order.length) {
      alert("No items in the order. Please add items before submitting.");
      return;
    }

  const formattedOrder = {
    amount: formData.totalPrice,
    downpayment: formData.downpayment,
    refNumber: formData.refNumber,
    option: diningOpt,
    status: "pending",
    discount: discount || 0,
    cashPayment: 0,
  
  tickets: order.map((item) => ({
    product_id: item.id,
    product_name: item.product_name,
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.price * item.quantity,
  })),

  
};
    try {
      await axiosClient.post("/create-order-Customer", formattedOrder);
      alert("Order submitted successfully!");
      setOrder([]);
      setFormData({
        totalPrice: "",
        downpayment: "",
        refNumber: "",
      });
      window.location.reload();
    } 
    catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  return {
    order,
    diningOpt,
    setDiningOpt,
    discount,
    setDiscount,
    addItemToOrder,
    removeItemFromOrder,
    submitOrder,
    formData,
    setFormData,
  };
}
