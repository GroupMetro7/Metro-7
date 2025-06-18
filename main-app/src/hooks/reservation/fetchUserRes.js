import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useFetchUserRes() {
  const [reservations, setReservations] = useState([]);
  const [preOrders, setPreOrders] = useState([]);
  useEffect(() => {
    axiosClient.get('/myReservations')
      .then(response => {
        setReservations(response.data.reserved);
        setPreOrders(response.data.preOrders);
      })
      .catch(error => {
        console.error('Error fetching user reservations:', error);
      });
  }, []);

  return {
    reservations,
    preOrders,
  };
}

