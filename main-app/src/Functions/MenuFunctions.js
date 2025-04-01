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
      setSuccess("Product deleted successfully");
  } catch (err) {
      setError("Failed to delete product, please try again!");
  }
};
