import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useOrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


      useEffect(() => {
    const fetchOrder = (page) => {
      axiosClient.get(`/completed-order?page=${page}`).then(({ data }) => {
        setOrderHistory(data.completedOrders.data);
        setCurrentPage(data.completedOrders.current_page);
        setTotalPages(data.completedOrders.last_page);
      });
    };
    fetchOrder(currentPage);
  }, [currentPage]);

  return {
    orderHistory,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
