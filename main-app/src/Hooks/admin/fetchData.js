import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import usePagination from "../Universal/pagination_function";

export default function useFetchDashboardData() {
  const [orders, setOrders] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [mostSoldProduct, setMostSoldProduct] = useState(null);
  const [productRevenue, setProductRevenue] = useState([]);
  const [ dailyOrders, setDailyOrders ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentPage, totalPages, setTotalPages, handlePageChange } = usePagination();

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
    axiosClient
      .get("/sales-product-revenue")
      .then((data) => {
        setProductRevenue(data.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchOrder = (page) => {
      axiosClient.get(`/orders?page=${page}`).then(({ data }) => {
        setOrders(data.data);
        setTotalPages(data.last_page);
      });
    };
    fetchOrder(currentPage);
  }, [currentPage, totalPages]);

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
    handlePageChange
  };
}
