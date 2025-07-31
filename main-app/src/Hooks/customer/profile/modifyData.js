import { useEffect, useState } from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import axiosClient from "../../../axiosClient";

export default function useModifyData() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    refNumber: ""
  });
  const { user, setUser } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder ] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const editData = (res) => {
    setSelectedReservation(res);
    setFormData({
      firstname: res.firstname,
      lastname: res.lastname,
      email: res.email,
      contact: res.contact,
    })
  }

    const viewOrder = (order) => {
    setSelectedOrder(order);
  }

    useEffect(() => {
      if (user) {
        setFormData({
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          contact: user.contact || "",
        });
      }
    }, [user]);

      const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    const handleUpdateUser = async (e) => {
      e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axiosClient.put(`/user`, {
        ...formData,
        contact: Number(formData.contact),
      });
      setUser(response.data);
      alert("Profile updated successfully!");
      setIsLoading(false);
      window.location.reload();
    }
    catch(error) {
      alert(
        "Failed to update profile. Please try again."
      )
    }
    finally {
      setIsLoading(false);
    }
  }

  const deleteReservation = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.delete(`/delete-reservation/${selectedReservation.id}`);
      alert("Reservation deleted successfully!");
      setSelectedReservation(null);
    }catch(error){
      alert("Failed to delete reservation. Please try again.");
    }
  }

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    try {
      await axiosClient.put(`/orderList/${selectedOrder.id}`, formData);
      setSuccess("Order updated successfully!");
    } catch (error) {
      setError("Failed to update order. Please try again.");
    }
  }

    return {
      user,
      formData,
      setUser,
      handleInputChange,
      handleUpdateUser,
      editData,
      isLoading,
      selectedOrder,
      selectedReservation,
      viewOrder,
      deleteReservation,
      setFormData,
      handleUpdateOrder,
      error,
      success
    }
}
