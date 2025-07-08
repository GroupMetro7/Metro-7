import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export default function useFetch() {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [expenses, setExpenses] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [mostSoldProduct, setMostSoldProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [menuProduct, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const fetchMenu = (page) => {
      axiosClient.get(`/adminmenu?page=${page}`).then(({ data }) => {
        setMenu(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
      });
    };
    fetchMenu(currentPage);
  }, [currentPage]);

  useEffect(() => {
    axiosClient.get("/categories").then((res) => {
      setCategories(res.data);
      if (res.data.length > 0) setSelectedCategory(res.data[0].id);
    });
  }, []);

  useEffect(() => {
    axiosClient
      .get("/products") // or your correct endpoint
      .then((res) => {
        // If your API returns { data: [...] }
        setIngredients(
          Array.isArray(res.data) ? res.data : res.data.data || []
        );
      })
      .catch((err) => console.error("Failed to fetch ingredients:", err));
  }, []);

  return {
    monthlyRevenue,
    mostSoldProduct,
    loading,
    error,
    orders,
    setOrders,
    menuProduct,
    setMenu,
    categories,
    setCategories,
    ingredients,
    setIngredients,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    expenses,
    totalStockValue,
    monthlyExpenses,
  };
}
