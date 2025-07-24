import { useState } from "react";

export default function usePagination(initialPage = 1) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const resetPagination = () => {
    setCurrentPage(1);
    setTotalPages(1);
  };

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    setTotalPages,
    handlePageChange,
    resetPagination,
  };
}
