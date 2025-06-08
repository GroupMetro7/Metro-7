import { useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useAddProduct() {
  //variables
  const [formData, setFormData] = useState({
    id: "",
    product_name: "",
    description: "",
    price: "",
    image_url: null,
    category_id: "",
  });
  const [selects, setSelects] = useState([{ sku: "", quantity: "" }]);
  const [ProductError, setError] = useState(null);
  const [ProductSuccess, setSuccess] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // function for adding, removing and handling ingredients select box

  const addSelectBox = () => {
    setSelects((prev) => [...prev, { sku: "", quantity: "" }]);
  };

  const removeSelectBox = (indexToRemove) => {
    setSelects((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleIngredientChange = (index, field, value) => {
    setSelects((prev) =>
      prev.map((sel, idx) => (idx === index ? { ...sel, [field]: value } : sel))
    );
  };

  //function for adding product

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Prepare FormData for file upload
    const data = new FormData();
    data.append("product_name", formData.product_name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);
    data.append("category_id", formData.category_id);

    // Only include ingredients with both sku and quantity
    const ingredientsToSend = selects
      .filter((sel) => sel.sku && sel.quantity)
      .map((sel) => ({
        sku: sel.sku,
        quantity: sel.quantity,
      }));
    data.append("ingredients", JSON.stringify(ingredientsToSend));

    try {
      await axiosClient.post("/menu", data);
      setSuccess("Product added successfully");
      setFormData({
        product_name: "",
        description: "",
        price: "",
        image: null,
        category_id: "",
      });
      setSelects([{ sku: "", quantity: "" }]);
    } catch (err) {
      setError("Failed to add product, please try again.");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const data = new FormData();
    data.append("product_name", formData.product_name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category_id", formData.category_id);

    // Only append image if it's a File (user selected a new one)
    if (formData.image_url && formData.image_url instanceof File) {
      data.append("image", formData.image_url);
    }

    const ingredientsToSend = selects
      .filter((sel) => sel.sku && sel.quantity)
      .map((sel) => ({
        sku: sel.sku,
        quantity: sel.quantity,
      }));
    data.append("ingredients", JSON.stringify(ingredientsToSend));

    try {
      await axiosClient.post(`/menu/${currentProductId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        params: { _method: "PUT" },
      });
      setSuccess("Product updated successfully");
      setFormData({
        order_number: "",
        product_name: "",
        description: "",
        price: "",
        image_url: null,
        category_id: "",
      });
      setSelects([{ sku: "", quantity: "" }]);
      setCurrentProductId(null);
    } catch (err) {
      setError("Failed to update product, please try again.");
    }
  };

  const editProduct = (product) => {
    setCurrentProductId(product.id);
    setFormData({
      id: product.id,
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      image_url: product.image_url || null,
      category_id: product.category_id,
      ingredients: product.ingredients || [],
    });
    setSelects(
      (product.ingredients || []).map((ing) => ({
        sku: ing.SKU_NUMBER || ing.sku,
        quantity: ing.quantity,
      }))
    );
  };

  const deleteProduct = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axiosClient.delete(`/menu/${currentProductId}`);
      setSuccess("Item deletion successful");
      setCurrentProductId(null);
      setFormData({
        product_name: "",
        description: "",
        price: "",
        image_url: null,
        category_id: "",
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
      setError("Failed to delete item, please try again!");
      return false;
    }
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    selects,
    setSelects,
    addSelectBox,
    removeSelectBox,
    handleIngredientChange,
    handleAddProduct,
    ProductError,
    ProductSuccess,
    editProduct,
    handleUpdateProduct,
    deleteProduct,
  };
}
