import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
// import { fetchMenu } from "../../functions/MenuFunctions";

export default function useFetchOrder() {
  const [menuProduct, setMenu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);


    useEffect(() => {
    fetchMenu(currentPage, searchItem, selectedCategory);
  }, [currentPage, searchItem, selectedCategory]);

  function fetchMenu(page, search, categoryId) {
    let url = `/adminmenu?page=${page}`;
    if(search){
      url += `&search=${encodeURIComponent(search)}`;
    }
    if(categoryId){
      url += `&category_id=${(categoryId)}`;
    }

      axiosClient.get(url).then(({ data }) => {
        setMenu(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
      });
  }


  useEffect(() => {
    axiosClient
      .get("/ingredients")
      .then((res) => {
        setIngredients(
          Array.isArray(res.data) ? res.data : res.data.data || []
        );
      })
      .catch((err) => console.error("Failed to fetch ingredients:", err));
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axiosClient.get("/categories").then((res) => {
      setCategories(res.data);
    });
  }

  return {
    menuProduct,
    setMenu,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    ingredients,
    categories,
    fetchMenu,
    selectedOrder,
    setSelectedOrder,
    fetchCategories,
    setSearchItem,
    setSelectedCategory,
  };
}
