import { useState } from "react";
import axiosClient from "../../axiosClient";

export default function useModifyOrderList(selectedOrder){
  const [formData, setFormData] = useState({
    downpayment: '',
    refNumber: '',
    status: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axiosClient.put(`/orderList/${selectedOrder.id}`, {
      downpayment: formData.downpayment,
      refNumber: formData.refNumber,
      status: formData.status,
      });
      setSuccess("Order updated successfully!");
    } catch (error) {
      setSuccess(null);
      setError(
        error.response?.data?.message || "Failed to update order, please try again!"
      );

    }
  }
    return {
    formData,
    setFormData,
    handleUpdateOrder,
    error,
    success
  };
  }



