import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { fetchMenu } from "../../functions/MenuFunctions";

export default function useFetchOrder() {
  const [menuProduct, setMenu ] =useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedOrder, setSelectedOrder ] = useState(null);

      useEffect(() => {
        const fetchMenu = (page) => {
            axiosClient.get(`/adminmenu?page=${page}`).then(({ data }) => {
                setMenu(data.products);
                setCurrentPage(data.current_page);
                setTotalPages(data.last_page);
            });
        };
        fetchMenu(currentPage);
    }, [currentPage]);

    useEffect(() => {
    axiosClient.get('/ingredients')
        .then(res => {
            setIngredients(Array.isArray(res.data) ? res.data : res.data.data || []);
        })
        .catch(err => console.error("Failed to fetch ingredients:", err));
    }, []);

      useEffect(() => {
  axiosClient.get("/categories").then(res => {
    setCategories(res.data);
    });
  }, []);

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
        setSelectedOrder
    };
};
