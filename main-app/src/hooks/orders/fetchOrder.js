import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { fetchMenu } from "../../functions/MenuFunctions";

export default function useFetchOrder() {
  const [menuProduct, setMenu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = (page) => {
      axiosClient.get(`/orders?page=${page}`).then(({ data }) => {
        setOrders(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
      });
    };
    fetchOrder(currentPage);
  }, [currentPage]);

  useEffect(() => {
    axiosClient
      .get("/ingredients")
      .then((res) => {
        setIngredients(
          Array.isArray(res.data) ? res.data : res.data.data || []
        );
      })
      .catch((err) => console.error("Failed to fetch ingredients:", err));
  }, []);

  useEffect(() => {
    axiosClient.get("/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return {
    menuProduct,
    setMenu,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    ingredients,
    categories,
    fetchMenu,
    orders,
    selectedOrder,
    setSelectedOrder,
  };
}
