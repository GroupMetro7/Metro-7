import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useFetchProduct() {
    const [menuItems, setMenuItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (selectedCategory) {
      axiosClient
        .get(`/menuData?category_id=${selectedCategory}`)
        .then((res) => setMenuItems(res.data.products));
    } else {
      axiosClient.get("/menuData").then((res) => setMenuItems(res.data.products));
    }
  }, [selectedCategory]);

    return {
        menuItems,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        selectedCategory,
        setSelectedCategory
    };
}
