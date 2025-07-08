import axiosClient from '../axiosClient';

export const fetchAllEmployees = async (setUsers, setError, setCurrentPage, setTotalPages, page) => {
  try {
      // Call the backend API with the current page
      const { data } = await axiosClient.get(`/employees?page=${page}`);
      // Update the state with the list of employees and pagination metadata
      setUsers(data.data); //lists of users
      setCurrentPage(data.current_page); // Update the current page
      setTotalPages(data.last_page); // Update the total number of pages
  } catch (error) {
      console.error('Failed to fetch employees:', error);
      setError('Failed to fetch employees. Please try again.');
  }
};


export const modifyEmployee = async (e, id, formData, setFormData, fetchAllEmployees, setSuccess, setError,setUsers, setCurrentPage, setTotalPages,currentPage) => {
  e.preventDefault();
  setError(null); // Clear any previous errors
  setSuccess(null); // Clear any previous success messages

  try {
    // PUT request to the backend to update user details
    const response = await axiosClient.put(`/updateUserByAdmin/${id}`, {
      firstname: formData.firstname,
      lastname: formData.lastname,
      role: formData.role,
    });
    setFormData(response.data.user);
    alert("User information updated successfully");
    fetchAllEmployees(setUsers, setCurrentPage, setTotalPages, currentPage);
    window.location.reload();
  } 
  catch (error) {
    console.error('Failed to update user details:', error);

    // Handle error and show an appropriate message
    setError(
      error.response?.data?.message || "Failed to update user details. Please try again."
    );
  }
};

// Retain the details to the input fields
export const editEmployee = (employee, setFormData, setCurrentEmployeeId) => {
  setFormData({
    firstname: employee.firstname,
    lastname: employee.lastname,
    email: employee.email,
    contact: employee.contact,
    role: employee.role,
  });
  setCurrentEmployeeId(employee.id);
};
