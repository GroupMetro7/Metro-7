import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import usePagination from "../Universal/pagination_function";

export default function useFetchDashboardData() {
  const [orders, setOrders] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [mostSoldProduct, setMostSoldProduct] = useState(null);
  const [productRevenue, setProductRevenue] = useState([]);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentPage, totalPages, setTotalPages, handlePageChange } =
    usePagination();

  const ordersPagination = usePagination();
  const revenuePagination = usePagination();

  //filter variables
  const [filterMonth, setFilterMonth] = useState("");

  // Fetching admin dashboard data (KPI, Monthly Revenue, Expenses, Stock Value, Most Sold Product)

  useEffect(() => {
    axiosClient
      .get("/dashboard-data")
      .then((response) => {
        setMonthlyRevenue(response.data.monthly_revenue);
        setMonthlyExpenses(response.data.monthly_expenses || []);
        setMostSoldProduct(response.data.most_sold_product || null);
        setDailyOrders(response.data.daily_orders || []);
        setLoading(false);
      })

      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

useEffect(() => {
  fetchRevenue(revenuePagination.currentPage, filterMonth);
}, [revenuePagination.currentPage, filterMonth]);

const fetchRevenue = async (page, filterMonth) => {
  let url = `/sales-product-revenue?page=${page}`;
  if (filterMonth) {
    url += `&month=${encodeURIComponent(filterMonth)}`;
  }
  try {
    const response = await axiosClient.get(url);
    setProductRevenue(response.data.data);
    revenuePagination.setTotalPages(response.data.last_page);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

useEffect(() => {
  const fetchOrder = async (page) => {
    try {
      const { data } = await axiosClient.get(`/orders?page=${page}`);
      setOrders(data.data);
      ordersPagination.setTotalPages(data.last_page);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  fetchOrder(ordersPagination.currentPage);
}, [ordersPagination.currentPage]);

  return {
    monthlyRevenue,
    monthlyExpenses,
    mostSoldProduct,
    loading,
    error,
    orders,
    totalPages,
    currentPage,
    productRevenue,
    dailyOrders,
    handlePageChange,
    revenuePagination,
    setFilterMonth
  };
}
