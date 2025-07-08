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
  const [searchItem, setSearchItem] = useState("");

useEffect(() => {
    fetchOrder(currentPage, searchItem);
  }, [currentPage, searchItem]);

    function fetchOrder(page, search) {
      let url = `/orders?page=${page}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`; // <-- FIXED
      }
      axiosClient.get(url).then(( data ) => {
        setOrders(data.data.data);
        setCurrentPage(data.data.current_page);
        setTotalPages(data.data.last_page);
      });
    };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
    handlePageChange,
    setSearchItem,
    fetchOrder
  };
}
