import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import usePagination from "../../Universal/pagination_function";

export default function useOrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filterDate, setFilterDate] = useState('');
  const { currentPage, totalPages, setTotalPages, handlePageChange } = usePagination();

  useEffect(() => {
    fetchOrder(currentPage, searchItem, filterDate);
  }, [currentPage, searchItem, filterDate, totalPages]);


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
      setTotalPages(data.completedOrders.last_page);
    });
  };

  return {
    orderHistory,
    currentPage,
    totalPages,
    setSearchItem,
    setFilterDate,
    handlePageChange
  };
}
