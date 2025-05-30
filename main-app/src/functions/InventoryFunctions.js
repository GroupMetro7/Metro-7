import axiosClient from "../axiosClient";

// Fetch Products
export const fetchProducts = async (page, setProducts, setCurrentPage, setTotalPages) => {
    try {
        const { data } = await axiosClient.get(`/products?page=${page}`);
        setProducts(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
};

// Delete Product
export const deleteProduct = async (id, setError, setSuccess, products, setProducts) => {
    setError(null);
    setSuccess(null);

    const isConfirmed = window.confirm("Are you sure you want to delete this item?");
    if (!isConfirmed) return;

    try {
        await axiosClient.delete(`/products/${id}`);
        // setProducts(products.filter((product) => product.id !== id));
        setSuccess("Item deleted successfully");
    } catch (error) {
        console.error("Failed to delete product:", error);
        setError("Failed to delete item, please try again!");
    }
};

// Add or Modify Product
export const saveProduct = async (e, formData, isEdit, id, setError, setSuccess, resetForm, fetchProducts, currentPage, setProducts, setCurrentPage, setTotalPages) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        const url = isEdit ? `/products/${id}` : '/products';
        const method = isEdit ? 'put' : 'post';

        await axiosClient[method](url, formData);
        setSuccess(isEdit ? "Product updated successfully" : "Product added successfully");
        resetForm(); // Reset form fields
        fetchProducts(currentPage, setProducts, setCurrentPage, setTotalPages);
    } catch (error) {
        console.error("Failed to save product:", error);
        setError(error.response?.data?.message || "Failed to save product, please try again!");
    }
};

// Prefill Form for Editing
export const editProduct = (product, setFormData, setCurrentProductId) => {
    setFormData({
        ITEM_NAME: product.COMPOSITE_NAME,
        CATEGORY: product.CATEGORY,
        STOCK: product.STOCK,
        COST_PER_UNIT: product.COST_PER_UNIT,
    });
    setCurrentProductId(product.id);
};
