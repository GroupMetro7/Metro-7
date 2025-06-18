import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useStockLogs() {
  const [logs, setLogs ] =useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchItem, setSearchItem] = useState("");

useEffect(() => {
  const fetchlogs = (page, search) => {
    let url = `/stock-logs?page=${page}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    axiosClient.get(url).then((data) => {
      setLogs(data.data.data);
      setCurrentPage(data.data.current_page);
      setTotalPages(data.data.last_page);
    });
  };
  fetchlogs(currentPage, searchItem);
}, [currentPage, searchItem]);

    const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    logs,
    handlePageChange,
    currentPage,
    totalPages,
    setSearchItem,
  }
}
