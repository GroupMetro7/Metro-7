import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import usePagination from "../../Universal/pagination_function";

export default function useFetchCustomers() {
  const [users, setUsers] = useState([]);
  const { currentPage, totalPages, setTotalPages, handlePageChange } =
    usePagination();
  const [search, setSearch] = useState("");

  const fetchCustomers = async (page, search) => {
    axiosClient.get(`/customers?page=${page}&search=${encodeURIComponent(search)}`).then(({ data }) => {
      setUsers(data.data);
      setTotalPages(data.last_page);
    });
  };

  useEffect(() => {
    fetchCustomers(currentPage, search);
  }, [currentPage, search]);

  return {
    users,
    currentPage,
    handlePageChange,
    fetchCustomers,
    totalPages,
    setSearch,
    search,
  }
}
