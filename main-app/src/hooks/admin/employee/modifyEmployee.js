import { useState } from "react";
import axiosClient from "../../../axiosClient";

export default function useModifyEmployee() {
  const [ formData, setFormData ] = useState({
    firstname: "",
    lastname:""
    ,email:""
    ,contact:""
    ,role:""
    ,loyalty:""
  });
  const [ employeeId, setEmployeeId ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ success, setSuccess ] = useState(null);

  const updateEmployee = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await axiosClient.put(`/updateUserByAdmin/${employeeId}`, formData);
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred while updating the employee.");
      console.error("Error updating employee:", error);
    }
  }


  const modifyEmployee = (employee) => {
    setFormData({
      firstname: employee.firstname,
      lastname: employee.lastname,
      email: employee.email,
      contact: employee.contact,
      role: employee.role,
      loyalty: employee.loyalty
    });
    setEmployeeId(employee.id)
  }


      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

  return {
    modifyEmployee,
    formData,
    handleInputChange,
    updateEmployee,
    error,
    success
  }
}
