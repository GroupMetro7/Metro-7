import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useFetchData(){

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
  fetchProducts(currentPage, searchItem);
}, [currentPage, searchItem]);

    const fetchProducts = (page, search) => {
      let url = `/products?page=${page}`;
      if(search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
        axiosClient.get(url).then(({ data }) => {
        setProducts(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
    });
  };

  return {
    products,
    setProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    setSearchItem,
    fetchProducts
  };
}
