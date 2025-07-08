import { useEffect, useState } from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import axiosClient from "../../../axiosClient";

export default function useModifyData() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
  });
  const { user, setUser } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);

  const editData = (res) => {
    setFormData({
      firstname: res.firstname,
      lastname: res.lastname,
      email: res.email,
      contact: res.contact,
    })
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

    return {
      formData,
      user,
      setUser,
      handleInputChange,
      handleUpdateUser,
      editData,
      isLoading
    }
}