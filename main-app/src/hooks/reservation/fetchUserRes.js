import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useFetchUserRes() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axiosClient.get('/myReservations')
      .then(response => {
        setReservations(response.data.reserved);
      })
      .catch(error => {
        console.error('Error fetching user reservations:', error);
      });
  }, []);

  return { reservations };
}

