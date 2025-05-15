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

export const modify = async (e, id, formData, setFormData, fetchAllUsers, setSuccess, setUsers, setError, setCurrentPage, setTotalPages, currentPage) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  try {
    const response = await axiosClient.put(`/updateUserByAdmin/${id}`, {
      firstname: formData.firstname,
      lastname: formData.lastname,
      role: formData.role,
    });

    setFormData(response.data.user);

    setSuccess("User information updated successfully");

    fetchAllUsers(setUsers, setCurrentPage, setTotalPages,currentPage);
  } catch (error) {
    console.error('Failed to update user details:', error);

    // Handle error and show an appropriate message
    setError(
      error.response?.data?.message || "Failed to update user details. Please try again."
    );
  }
};
