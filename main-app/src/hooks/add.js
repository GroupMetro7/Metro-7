import { useState } from "react";
import axiosClient from "../axiosClient";

const useAddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/createCategory', {
        name: categoryName,
        description: categoryDescription,
      });
      setSuccess('Category added successfully');
      setCategoryName('');
      setCategoryDescription('');
      setError(null);
    } catch (err) {
      setError('Failed to add category');
      setSuccess(null);
    }
  };

  return {
    categoryName,
    setCategoryName,
    categoryDescription,
    setCategoryDescription,
    handleAddCategory,
    error,
    success,
  };
};

export default useAddCategory;
