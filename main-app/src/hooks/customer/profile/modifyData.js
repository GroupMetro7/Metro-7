import { useEffect, useState } from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import axiosClient from "../../../axiosClient";

export default function useModifyData(selectedOrder) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
  });
  const [orderData, setOrderData] = useState({
    refNumber: "",
    downpayment: "",
  });
  const { user, setUser } = useStateContext();

  useEffect(() => {
    if (selectedOrder) {
      setOrderData({
        downpayment: selectedOrder.downpayment ?? "",
        refNumber: selectedOrder.refNumber ?? "",
      });
    }
  }, [selectedOrder]);

  const editData = (res) => {
    setFormData({
      firstname: res.firstname,
      lastname: res.lastname,
      email: res.email,
      contact: res.contact,
    });
  };

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        contact: user.contact || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(`/user`, {
        ...formData,
        contact: Number(formData.contact),
      });
      setUser(response.data);
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put(
        `/updatePayment/${selectedOrder.id}`,
        {
          refNumber: orderData.refNumber,
          downpayment: Number(orderData.downpayment),
        }
      );
      alert("Payment Successful!");
      console.log(response.data);
      setOrderData({
        refNumber: "",
        downpayment: "",
      });
    } catch (error) {
      console.error(error);
      alert("Payment Failed, please try again.");
    }
  };

  return {
    formData,
    user,
    setUser,
    handleInputChange,
    handleUpdateUser,
    editData,
    handleOrderInputChange,
    setOrderData,
    orderData,
    handleUpdatePayment,
  };
}
