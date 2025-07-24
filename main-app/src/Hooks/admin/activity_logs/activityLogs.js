import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import usePagination from "../../Universal/pagination_function";

export default function useStockLogs() {
  const [logs, setLogs ] =useState([]);
  const { currentPage, totalPages, setTotalPages, handlePageChange } = usePagination();
  const [searchItem, setSearchItem] = useState("");

useEffect(() => {
  const fetchlogs = (page, search) => {
    let url = `/stock-logs?page=${page}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    axiosClient.get(url).then((data) => {
      setLogs(data.data.data);
      setTotalPages(data.data.last_page);
    });
  };
  fetchlogs(currentPage, searchItem);
}, [currentPage, searchItem, setTotalPages]);

  return {
    logs,
    handlePageChange,
    currentPage,
    totalPages,
    setSearchItem,
  }
}
