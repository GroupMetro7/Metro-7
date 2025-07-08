import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useModifyOrderList(selectedOrder, fetchOrder) {
  const [formData, setFormData] = useState({
    cashPayment: "",
    onlinePayment: "",
    downpayment: "",
    refNumber: "",
    status: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (selectedOrder) {
      setFormData({
        cashPayment: selectedOrder.cashPayment ?? "",
        onlinePayment: selectedOrder.onlinePayment ?? "",
        downpayment: selectedOrder.downpayment ?? "",
        refNumber: selectedOrder.refNumber ?? "",
        status: selectedOrder.status ?? "",
      });
    }
  }, [selectedOrder]);

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axiosClient.put(`/orderList/${selectedOrder.id}`, {
        cashPayment: formData.cashPayment,
        onlinePayment: formData.onlinePayment,
        downpayment: formData.downpayment,
        refNumber: formData.refNumber,
        status: formData.status,
      });
      setSuccess("Order updated successfully!");
      fetchOrder();
    } catch (error) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
          "Failed to update order, please try again!"
      );
    }
  };

  return {
    formData,
    setFormData,
    handleUpdateOrder,
    error,
    success,
  };
}
