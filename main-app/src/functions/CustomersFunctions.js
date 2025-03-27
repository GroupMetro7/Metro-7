import axiosClient from "../axiosClient";

export const fetchCustomers = (page, setCustomers, setCurrentPage, setTotalPages) => {
  axiosClient.get(`/customers?page=${page}`).then(({ data }) => {
      setCustomers(data.data);
      setCurrentPage(data.current_page);
      setTotalPages(data.last_page);
  });
};

//add customer
export const addCustomer = async (e, firstname, lastname, email, loyalty, total_spent, balance, setError, setSuccess, currentPage, setCustomers, setCurrentPage, setTotalPages, fetchCustomers) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  try {
      await axiosClient.post('/customers', {
          firstname: firstname,
          lastname: lastname,
          email: email,
          loyalty: loyalty,
          total_spent: total_spent,
          balance: balance,
      });
      setSuccess('Customer added successfully');
      fetchCustomers(currentPage, setCustomers, setCurrentPage, setTotalPages);
  } catch (error) {
      setError('An error occurred');
  }
};

//remove customer
export const removeCustomer = async (id, setError, setSuccess, Customers, setCustomers) => {
  setError(null);
  setSuccess(null);

  try {
      await axiosClient.delete(`/customers/${id}`);
      setCustomers(Customers.filter((customer) => customer.id !== id));
      setSuccess("Customer has been removed!");
  } catch (err) {
      setError("Failed to remove Customer, please try again!");
  }
};

export const modifyCustomer = async (e, id, firstname, lastname, email, loyalty, total_spent, balance, setFirstName, setLastName, setEmail, setLoyalty, setBalance, setTotalSpent, setSuccess, setError, Customers, currentPage, setCustomers, setCurrentPage, setTotalPages) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  try {
    const response = await axiosClient.put(`/customers/${id}`, {
        firstname,
        lastname,
        email,
        loyalty,
        total_spent,
        balance,
    });

    setSuccess("Customer information updated successfully");
    setFirstName("");
    setLastName("");
    setEmail("");
    setLoyalty("");
    setBalance("");
    setTotalSpent("");
    fetchCustomers(currentPage, setCustomers, setCurrentPage, setTotalPages);

  } catch (err) {
    setError(
      err.response?.data?.message || "Failed to update Customer, please try again!"
    );
  }
};

export const editCustomer =(customer, setFirstName, setLastName, setEmail, setLoyalty, setBalance, setTotalSpent, setCurrentCustomerId) => {
  setFirstName(customer.firstname);
  setLastName(customer.lastname);
  setEmail(customer.email);
  setLoyalty(customer.loyalty);
  setBalance(customer.balance);
  setTotalSpent(customer.total_spent);
  setCurrentCustomerId(customer.id);
};
