import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useFetchProduct() {
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchItem, setSearchItem] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchMenuData(selectedCategory, searchItem);

    // Fetch updates every 30 seconds
    intervalRef.current = setInterval(() => {
      fetchMenuData(selectedCategory, searchItem);
    }, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [selectedCategory, searchItem]);

  const fetchMenuData = (category, search) => {
    let url = `/menuData`;
  const params = new URLSearchParams();

  if (category) {
    params.append('category_id', category);
  }
  if (search) {
    params.append('search', search);
  }

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

    axiosClient
      .get(url)
      .then((data) => {
        setMenuItems(data.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axiosClient.get("/categories").then((res) => {
      setCategories(res.data);
    });
  }

  return {
    menuItems,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    selectedCategory,
    setSelectedCategory,
    setSearchItem,
    categories,
    fetchCategories,
  };
}