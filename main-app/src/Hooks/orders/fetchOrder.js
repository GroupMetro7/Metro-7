import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axiosClient";
import { fetchMenu } from "../../functions/MenuFunctions";

export default function useFetchOrder() {
  const [menuProduct, setMenu] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchItem, setSearchItem] = useState("");
  const intervalRef = useRef(null);
  const audioRef = useRef(null);
  const previousOrderIdsRef = useRef([]);

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
  }, [currentPage, searchItem]);

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
      setCurrentPage(data.data.current_page);
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
      setCurrentPage(data.data.current_page);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
    setCurrentPage,
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
  };
}