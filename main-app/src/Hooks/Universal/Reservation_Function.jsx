import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useReservationFunctions() {
  const [ reservations, setReservations ] = useState([]);
  const [ selectedReservation, setSelectedReservation ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);

        const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedReservation((prev) => ({ ...prev, [name]: value }));
    };

  useEffect(() => {
    fetchReservation();
  }, []);

  const fetchReservation = async () => {
    const response = await axiosClient.get("/reservations");
    setReservations(response.data);
  }

  const updateReservation = (res) => {
    setSelectedReservation(res);
  }

  //update function for reservation
  const updateReservationStatus = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try{
    await axiosClient.put(`/update-Reservation-Status/${selectedReservation.id}`,
      { status: selectedReservation.status }
    )
    fetchReservation();
    setSuccess("Reservation status updated successfully.");
  }catch (error) {
      console.error("Error updating reservation status:", error);
      setError(error.response?.data?.message || "An error occurred while updating the reservation status.");
    }
  }

  return {
    reservations,
    selectedReservation,
    updateReservation,
    updateReservationStatus,
    handleInputChange,
    error,
    success
  }
}