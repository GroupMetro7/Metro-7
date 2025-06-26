import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useFetchProduct() {
  const [menuItems, setMenuItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    fetchMenuData(selectedCategory, searchItem);
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


  return {
    menuItems,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    selectedCategory,
    setSelectedCategory,
    setSearchItem
  };
}
