import axiosClient from "../axiosClient";

export const fetchMenu = (page, setMenu, setCurrentPage, setTotalPages) => {
  axiosClient.get(`/menu?page=${page}`).then(({ data }) => {
      setMenu(data.data);
      setCurrentPage(data.current_page);
      setTotalPages(data.last_page);
  });
};

export const deleteProduct = async (id, setError, setSuccess, menuProduct, setMenu) => {
  setError(null);
  setSuccess(null);

  try {
      await axiosClient.delete(`/products/${id}`);
      setMenu(menuProduct.filter((product) => product.id !== id));
      alert("Product deleted successfully");
      window.location.reload();
  } 
  catch (err) {
      setError("Failed to delete product, please try again!");
  }
};

export const editProduct = (product, setFormData) => {
    setFormData({
        ITEM_NAME: product.product_name,
        CATEGORY: product.CATEGORY,
        STOCK: product.STOCK,
        COST_PER_UNIT: product.COST_PER_UNIT,
    });
};
