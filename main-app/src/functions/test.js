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
      setError('Failed to fetch employees. Please try again.');
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
