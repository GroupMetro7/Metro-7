import { useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useModifyCustomer() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        role: "",
        loyalty: "",
    });
  const [ customerId, setCustomerId ] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};

  const modifyCust = (customer) => {
    setFormData({
      firstname: customer.firstname,
      lastname: customer.lastname,
      email: customer.email,
      contact: customer.contact,
      role: customer.role,
      loyalty: customer.loyalty
    });
    setCustomerId(customer.id);
  }

  const updateCustomer = async (e)=> {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await axiosClient.put(`/updateUserByAdmin/${customerId}`, formData);
      setSuccess(response.data.message);
    }catch(error) {
      setError(error.response?.data?.message || "An error occurred while updating the customer.");
    }
  }

  return {
    formData,
    modifyCust,
    updateCustomer,
    handleInputChange,
    error,
    success,
  }
}
