import { useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useModifyItem() {
  const [formData, setFormData] = useState({
    COMPOSITE_NAME: "",
    category_id: "",
    STOCK: "",
    COST_PER_UNIT: "",
    SOLD_BY: ""
  });
  const [currentProductId, setCurrentProductId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const editProduct = (product) => {
    setFormData({
      COMPOSITE_NAME: product.COMPOSITE_NAME,
      category_id: product.category_id,
      STOCK: product.STOCK,
      COST_PER_UNIT: product.COST_PER_UNIT,
      SOLD_BY: product.SOLD_BY
    });
    setCurrentProductId(product.id);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null)
    try {
      const response = await axiosClient.post('/products', formData);
      setSuccess("Item successfully added");
    }catch (error) {
      console.error('Failed to add Item:', error);
      setError("Failed to add Item, please try again!");
    }
  }

  const deleteItem = async (id) => {
    setError(null);
    setSuccess(null);

    const isConfirmed = window.confirm("Are you sure you want to delete this item?")
    if (!isConfirmed) return false;

    try {
      await axiosClient.delete(`/products/${id}`);
      setSuccess("Item successfully deleted");
      window.location.reload();
    }catch (error) {
      console.error('Failed to delete Item:', error);
      setError("Failed to delete Item, please try again!");
    }
  }

  return {
    formData,
    setFormData,
    editProduct,
    currentProductId,
    setCurrentProductId,
    success,
    error,
    deleteItem,
    addProduct
  };
}
