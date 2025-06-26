import { useState } from "react";
import axiosClient from "../../../axiosClient";


export default function useCreateReservation() {
  const [formData, setFormData] = useState({
    reservationType: '',
    partySize: '',
    date: '',
    time: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCreateReservation = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      setError('You need to be registered and logged in to make a reservation.');
      return;
    }

    try {
      await axiosClient.post('/createReservation', formData);
      setSuccess('Reservation created successfully please wait for confirmation!');
      setFormData({
        reservationType: '',
        partySize: '',
        date: '',
        time: ''
      });
      setError(null);
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating reservation:", error);
      setError('Failed to create reservation, please try again later.');
      setSuccess(null);
    }
    finally {
      setIsLoading(false);
    }
  }

  return {
    formData,
    setFormData,
    handleInputChange,
    handleCreateReservation,
    isLoading,
    success,
    error
  };
}
