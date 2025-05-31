import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useFetchDashboardData() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [expenses, setExpenses] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [mostSoldProduct, setMostSoldProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching admin dashboard data (KPI, Monthly Revenue, Expenses, Stock Value, Most Sold Product)

  useEffect(() => {
    axiosClient
      .get("/dashboard-data")
      .then((response) => {
        setMonthlyRevenue(response.data.monthly_revenue);
        setExpenses(response.data.total_expense || 0);
        setMonthlyExpenses(response.data.monthly_expenses || []);
        setTotalStockValue(response.data.total_stock_value || 0);
        setMostSoldProduct(response.data.most_sold_product || null);
        setLoading(false);
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
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
      });
    };
    fetchOrder(currentPage);
  }, [currentPage]);

  //

    return {
    monthlyRevenue,
    expenses,
    monthlyExpenses,
    totalStockValue,
    mostSoldProduct,
    loading,
    error,
    orders,
    totalPages,
    currentPage
  };
}



