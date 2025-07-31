import { useEffect, useState } from "react";
import usePagination from "../Universal/pagination_function";
import axiosClient from "../../axiosClient";

export default function useFetchEmployees() {
      const [users, setUsers] = useState([]);
      const { currentPage, totalPages, setTotalPages, handlePageChange } = usePagination();
      const [search, setSearch] = useState("");


      const fetchEmployees = async (page, search) => {
      axiosClient.get(`/employees?page=${page}&search=${encodeURIComponent(search)}`).then(({data}) => {
        setUsers(data.data);
        setTotalPages(data.last_page);
      })
    }

    useEffect(()=> {
      fetchEmployees(currentPage, search);
    }, [currentPage, search]);

    return {
      users,
      currentPage,
      handlePageChange,
      fetchEmployees,
      totalPages,
      setSearch,
      search
    };
}
