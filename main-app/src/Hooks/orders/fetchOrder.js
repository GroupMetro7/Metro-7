import { useEffect, useRef, useState } from "react"
import axiosClient from "../../axiosClient"
import usePagination from "../Universal/pagination_function";

export default function useFetchOrder() {
    const [menuProduct, setMenu] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchItem, setSearchItem] = useState("");
    const intervalRef = useRef(null);
    const audioRef = useRef(null);
    const previousOrderIdsRef = useRef([]);
    const { currentPage, totalPages, setTotalPages, handlePageChange } = usePagination();

    const fetchMenu = (page, setMenu, setCurrentPage, setTotalPages) => {
    axiosClient.get(`/menu?page=${page}`).then(({ data }) => {
        setMenu(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
    });
    };

    useEffect(() => {
        audioRef.current = new Audio("/notification_tone.mp3"); // Add sound file to public folder
        audioRef.current.preload = "auto";
    }, []);

    useEffect(() => {
        // Clear any existing interval
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        fetchOrderSilent(currentPage, searchItem);

        intervalRef.current = setInterval(() => {
            fetchOrder(currentPage, searchItem);
        }, 10000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [currentPage, searchItem, totalPages]);

    function fetchOrderSilent(page, search) {
        let url = `/orders?page=${page}`;
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }
        axiosClient.get(url).then((data) => {
            const newOrders = data.data.data;
            const newOrderIds = newOrders.map((order) => order.id);

            // Update previous IDs without notification
            previousOrderIdsRef.current = newOrderIds;
            setOrders(newOrders);
            setTotalPages(data.data.last_page);
        });
    }

    function fetchOrder(page, search) {
        let url = `/orders?page=${page}`;
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }
        axiosClient.get(url).then((data) => {
            const newOrders = data.data.data;
            const newOrderIds = newOrders.map((order) => order.id);

            const isNewOrder = newOrderIds.some(
                (id) => !previousOrderIdsRef.current.includes(id)
            );

            if (previousOrderIdsRef.current.length && isNewOrder) {
                playNotificationSound();
            }

            previousOrderIdsRef.current = newOrderIds;
            setOrders(newOrders);
            setTotalPages(data.data.last_page);
        });
    }

    const playNotificationSound = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.log("Audio play failed:", error);
            });
        }
    };

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
        axiosClient.get("/categories").then((res) => {
            setCategories(res.data);
        });
    }, []);

    return {
        menuProduct,
        setMenu,
        currentPage,
        totalPages,
        setTotalPages,
        ingredients,
        categories,
        fetchMenu,
        orders,
        selectedOrder,
        setSelectedOrder,
        handlePageChange,
        setSearchItem,
        fetchOrder,
        handlePageChange
    };
}
