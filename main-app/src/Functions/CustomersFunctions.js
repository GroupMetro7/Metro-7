import axiosClient from '../axiosClient';

export const fetchAllUsers = async (setUsers, setError, setCurrentPage, setTotalPages, page) => {
  try {
      // Call the backend API with the current page
      const { data } = await axiosClient.get(`/customers?page=${page}`);
      // Update the state with the list of employees and pagination metadata
      setUsers(data.data); //lists of users
      setCurrentPage(data.current_page); // Update the current page
      setTotalPages(data.last_page); // Update the total number of pages
  } catch (error) {
      console.error('Failed to fetch employees:', error);
      setError('Failed to fetch customers. Please try again.');
  }
};


export const editCustomer = (customer, setFormData, setCurrentCustomerId) => {
  setFormData({
    firstname: customer.firstname,
    lastname: customer.lastname,
    email: customer.email,
    contact: customer.contact,
    role: customer.role,
  });
  setCurrentCustomerId(customer.id);
};

export const modify = async (e, id, formData, setFormData, fetchAllUsers, setSuccess, setError) => {
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

    // Update the form data with the response from the backend
    setFormData(response.data.user); // Assuming the backend returns the updated user in `response.data.user`

    // Show success message
    setSuccess("User information updated successfully");

    // Refresh the user list
    fetchAllUsers();
  } catch (error) {
    console.error('Failed to update user details:', error);

    // Handle error and show an appropriate message
    setError(
      error.response?.data?.message || "Failed to update user details. Please try again."
    );
  }
};
