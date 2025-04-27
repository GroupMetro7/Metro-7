import axiosClient from "../axiosClient";

//fetch Products
export const fetchProducts = (page, setProducts, setCurrentPage, setTotalPages) => {
    axiosClient.get(`/products?page=${page}`).then(({ data }) => {
        setProducts(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
    });
};

//delete product function
export const deleteProduct = async (id, setError, setSuccess, products, setProducts) => {
  setError(null);
  setSuccess(null);

  // Show confirmation popup
  const isConfirmed = window.confirm("Are you sure you want to delete this item?");
  if (!isConfirmed) {
      return; // Exit the function if the user cancels
  }

  try {
      await axiosClient.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      setSuccess("Item deleted successfully");
  } catch (err) {
      setError("Failed to delete item, please try again!");
  }
};

//add products function
export const addProduct = async (e, ITEM_NAME, CATEGORY, STOCK, COST_PER_UNIT, setError, setSuccess, setItemName, setCategory, setStock, setUnitCost, fetchProducts, currentPage, setProducts, setCurrentPage, setTotalPages) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        await axiosClient.post('/products', {
            ITEM_NAME: ITEM_NAME,
            CATEGORY: CATEGORY,
            STOCK: STOCK,
            COST_PER_UNIT: COST_PER_UNIT,
        });
        setSuccess('Product added successfully');
        setItemName('');
        setCategory('');
        setStock('');
        setUnitCost('');
        fetchProducts(currentPage, setProducts, setCurrentPage, setTotalPages);
    } catch (err) {
        setError(err.response.data.message || 'Failed to add product, please try again!');
    }
};

//modify product function
export const modifyProduct = async (e, id, ITEM_NAME, CATEGORY, STOCK, COST_PER_UNIT, setError, setSuccess, setItemName, setCategory, setStock, setUnitCost, products, currentPage, setProducts, setCurrentPage, setTotalPages) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        const response = await axiosClient.put(`/products/${id}`, {
            ITEM_NAME,
            CATEGORY,
            STOCK,
            COST_PER_UNIT
        });

        setSuccess("Product updated successfully");
        setItemName("");
        setCategory("");
        setStock("");
        setUnitCost("");
        fetchProducts(currentPage, setProducts, setCurrentPage, setTotalPages);
    } catch (err) {
        setError(
            err.response.data.message || "Failed to update product, please try again!"
        );
    }
};

//edit button function retain information
export  const editProduct = (product, setItemName, setCategory,setStock , setUnitCost, setCurrentProductId) => {
        setItemName(product.ITEM_NAME);
        setCategory(product.CATEGORY);
        setStock(product.STOCK);
        setUnitCost(product.COST_PER_UNIT);
        setCurrentProductId(product.id);
};
