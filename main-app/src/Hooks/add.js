import { useState } from "react";
import axiosClient from "../axiosClient";
import useFetchOrder from "./Universal/fetchProducts";

const useAddCategory = (fetchCategories) => {
  const [categoryName, setCategoryName] = useState('');
  const [addCategoryError, setError] = useState(null);
  const [AddCategorySuccess, setSuccess] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

    const editCategory =(category) => {
    setCurrentCategoryId(category.id);
    setCategoryName(category.name);
  }

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await axiosClient.post('/createCategory', {
        name: categoryName,
      });
      setSuccess('Category added successfully');
      fetchCategories([]);
      setCategoryName('');
      setError(null);
    } catch (err) {
      setError('Failed to add category');
      setSuccess(null);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axiosClient.put(`/categories/${currentCategoryId}`, {
        name: categoryName,
      });
      setSuccess('Category updated successfully');
      fetchCategories([]);
      setCategoryName('');
      setCurrentCategoryId(null);
      setError(null);
    }catch(error) {
      setSuccess(null);
      setError('Failed to update category, please try again!');
    }
  }

  const deleteCategory = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axiosClient.delete(`/categories/${currentCategoryId}`);
      setSuccess('Category deleted successfully');
      window.location.reload();
    }catch(error) {
      setError('Failed to delete category, please try again!');
    }
  }



  return {
    categoryName,
    setCategoryName,
    handleAddCategory,
    addCategoryError,
    AddCategorySuccess,
    editCategory,
    deleteCategory,
    handleUpdateCategory,
  };
};

export default useAddCategory;
