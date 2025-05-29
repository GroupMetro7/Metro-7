import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useFetchProduct() {
    const [menuItems, setMenuItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

        useEffect(() => {
        const fetchMenu = (page) => {
            axiosClient.get(`/adminmenu?page=${page}`).then(({ data }) => {
                setMenuItems(data.data);
            });
        };
        fetchMenu(currentPage);
    }, [currentPage]);

    return {
        menuItems,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages
    };
}
