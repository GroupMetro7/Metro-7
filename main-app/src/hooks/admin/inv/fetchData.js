import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useFetchData(){

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = (page) => {
        axiosClient.get(`/products?page=${page}`).then(({ data }) => {
        setProducts(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
    });
  };
  fetchProducts(currentPage);
}, [currentPage]);

useEffect(() => {
  //
})

  return {
    products,
    setProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages
  };
}
