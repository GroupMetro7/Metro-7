import { useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useModifyItem(fetchProducts) {
  const [formData, setFormData] = useState({
    COMPOSITE_NAME: "",
    category_id: "",
    STOCK: "",
    STOCK_VALUE: "",
    SOLD_BY: "",
    COST_PER_UNIT: ""
  });
  const [currentProductId, setCurrentProductId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const editProduct = (product) => {
    setFormData({
      COMPOSITE_NAME: product.COMPOSITE_NAME,
      category_id: product.category_id,
      STOCK: product.STOCK,
      STOCK_VALUE: product.STOCK_VALUE,
      SOLD_BY: product.SOLD_BY,
      COST_PER_UNIT: product.COST_PER_UNIT,
    });
    setCurrentProductId(product.id);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosClient.post('/products', formData);
      setSuccess("Item successfully added");
      setFormData({
      COMPOSITE_NAME: "",
      category_id: "",
      STOCK: "",
      STOCK_VALUE: "",
      SOLD_BY: "",
      COST_PER_UNIT: "",
    });
      fetchProducts();
    }catch (error) {
      console.error('Failed to add Item:', error);
      setError("Failed to add Item, please try again!");
    }
  }

    const modifyProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null)
    try {
      const response = await axiosClient.put(`/products/${currentProductId}`, formData);
      setSuccess("Item successfully modified");
      fetchProducts();
    }catch (error) {
      console.error('Failed to modify Item:', error);
      setError("Failed to modify Item, please try again!");
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
    addProduct,
    modifyProduct
  };
}
