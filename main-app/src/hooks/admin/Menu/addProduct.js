import { useState } from "react";
import axiosClient from "../../../axiosClient";



export default function useAddProduct() {

  //variables
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    price: '',
    image: null,
    category_id: '',
  });
  const [selects, setSelects] = useState([{ sku: "", quantity: "" }]);
  const [AddProductError, setError] = useState(null);
  const [AddProductSuccess, setSuccess] = useState(null);

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
      await axiosClient.post('/menu', data);
      setSuccess('Product added successfully');
      setFormData({
        product_name: '',
        description: '',
        price: '',
        image: null,
        category_id: '',
      });
      setSelects([{ sku: "", quantity: "" }]);
    } catch (err) {
      setError('Failed to add product');
    }
  };

  const editProduct = (product) => {
    setFormData({
      product_name: product.product_name,
      description: product.description,
      price: product.price,
      image: null, // Reset image to allow new upload
      category_id: product.category_id,
    });
    setSelects(product.ingredients.map(ing => ({ sku: ing.sku, quantity: ing.quantity })));
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
    AddProductError,
    AddProductSuccess,
    editProduct
  };
}
