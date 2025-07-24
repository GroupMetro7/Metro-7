import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import usePagination from "../../Universal/pagination_function";

export default function useFetchData(){

  const [products, setProducts] = useState([]);
  const { currentPage, totalPages, setTotalPages, handlePageChange } = usePagination();
  const [searchItem, setSearchItem] = useState("");
  const [filterStock, setFilterStock] = useState('');

  useEffect(() => {
  fetchProducts(currentPage, searchItem, filterStock);
}, [currentPage, searchItem, filterStock, totalPages]);


    const fetchProducts = (page, search, filterStock) => {
      let url = `/products?page=${page}`;
      if(search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      if(filterStock){
        url += `&filterStock=${encodeURIComponent(filterStock)}`;
      }
        axiosClient.get(url).then(({ data }) => {
        setProducts(data.data);
        setTotalPages(data.last_page);
    });
  };

  return {
    products,
    setProducts,
    currentPage,
    totalPages,
    setTotalPages,
    setSearchItem,
    fetchProducts,
    setFilterStock,
    handlePageChange
  };
}
