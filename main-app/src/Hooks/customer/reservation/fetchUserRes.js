import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useFetchUserRes() {
  const [reservations, setReservations] = useState([]);
  const [preOrders, setPreOrders] = useState([]);


  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/myReservations');
      setReservations(response.data.reserved);
      setPreOrders(response.data.preOrders);
    } catch (error) {
      console.error('Error fetching user reservations:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return {
    reservations,
    preOrders,
    fetchData
  };
}
