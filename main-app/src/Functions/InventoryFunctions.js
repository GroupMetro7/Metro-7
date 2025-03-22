import axiosClient from "../axiosClient";


export const deleteProduct = async (id, setError, setSuccess,products, setProducts) => {
  setError(null);
  setSuccess(null);

  try {
    await axiosClient.delete(`/products/${id}`);
    setProducts(products.filter((product) => product.id !== id));
    setSuccess("Product deleted successfully");
  } catch (err) {
    setError("Failed to delete product, please try again!");
  }
};
