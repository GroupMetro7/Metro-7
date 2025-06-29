import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useOrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchOrder(currentPage, searchItem, filterDate);
  }, [currentPage, searchItem, filterDate]);


  const fetchOrder = (page, search, filterDate) => {
    let url = `/completed-order?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    if (filterDate) {
      url += `&filterDate=${encodeURIComponent(filterDate)}`;
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
    setSearchItem,
    setFilterDate
  };
}
