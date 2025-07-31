import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import usePagination from "../../Universal/pagination_function";

export default function useFetchUserRes() {
  const [reservations, setReservations] = useState([]);
  const [preOrders, setPreOrders] = useState([]);
  const { currentPage, totalPages, setTotalPages, handlePageChange } =
    usePagination();

  const reservationsPagination = usePagination();
  const preOrdersPagination = usePagination();

  const fetchOrders = async (page) => {
    try {
      const response = await axiosClient.get(`/myReservations?page=${page}`);
      setPreOrders(response.data.preOrders.data);
      preOrdersPagination.setTotalPages(response.data.preOrders.last_page);
    }catch (error) {
      console.error('Error fetching user pre-orders:', error);
    }
  }

  useEffect(() => {
    fetchOrders(preOrdersPagination.currentPage);
  }, [preOrdersPagination.currentPage]);

  const fetchReservations = async (page) => {
    try {
      const response = await axiosClient.get(`/myReservations?page=${page}`);
      setReservations(response.data.reserved.data);
      reservationsPagination.setTotalPages(response.data.reserved.last_page);
    } catch (error) {
      console.error('Error fetching user reservations:', error);
    }
  }

  useEffect(() => {
    fetchReservations(reservationsPagination.currentPage);
  }, [reservationsPagination.currentPage]);

  return {
    reservations,
    preOrders,
    reservationsPagination,
    preOrdersPagination,
    currentPage,
    totalPages,
    handlePageChange
  };
}
