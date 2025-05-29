import { useState } from "react";
import axiosClient from "../../axiosClient";

export default function useDeleteProduct(){
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const deleteProduct = async (id) => {
    setError(null);
    setSuccess(null);

    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) return false;

    try {
      await axiosClient.delete(`/menu/${id}`);
      setSuccess("Item deletion successful");
      window.location.reload();
    }catch(error) {
      console.error('Failed to delete product:', error);
      setError("Failed to delete item, please try again!");
      return false;
    }
  }

  return {
    error,
    success,
    deleteProduct
  }
};
