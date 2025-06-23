import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useOrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    fetchOrder(currentPage, searchItem);
  }, [currentPage, searchItem]);


  const fetchOrder = (page, search) => {
    let url = `/completed-order?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    axiosClient.get(url).then(({ data }) => {
      setOrderHistory(data.completedOrders.data);
      setCurrentPage(data.completedOrders.current_page);
      setTotalPages(data.completedOrders.last_page);
    });
  };

  return {
    orderHistory,
    currentPage,
    totalPages,
    setCurrentPage,
    setSearchItem
  };
}
