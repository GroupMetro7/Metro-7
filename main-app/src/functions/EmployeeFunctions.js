import axiosClient from "../axiosClient";

export const fetchEmployees = (
  page,
  setEmployees,
  setCurrentPage,
  setTotalPages
) => {
  axiosClient.get(`/employees?page=${page}`).then(({ data }) => {
    setEmployees(data.data);
    setCurrentPage(data.current_page);
    setTotalPages(data.last_page);
  });
};

//add employee
export const addEmployee = async (
  e,
  name,
  email,
  phone,
  username,
  role,
  schedule,
  time,
  setError,
  setSuccess,
  fetchEmployees,
  currentPage,
  setEmployees,
  setCurrentPage,
  setTotalPages
) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  try {
    await axiosClient.post("/employees", {
      name: name,
      email: email,
      phone: phone,
      username: username,
      role: role,
      schedule: schedule,
      time: time,
    });
    setSuccess("Employee added successfully");
    fetchEmployees(currentPage, setEmployees, setCurrentPage, setTotalPages);
  } catch (error) {
    setError("An error occurred");
  }
};

//remove employee function
export const removeEmployee = async (
  id,
  setError,
  setSuccess,
  Employees,
  setEmployees
) => {
  setError(null);
  setSuccess(null);

  try {
    await axiosClient.delete(`/employees/${id}`);
    setEmployees(Employees.filter((employee) => employee.id !== id));
    setSuccess("Employee has been removed!");
  } catch (err) {
    setError("Failed to delete employee, please try again!");
  }
};

//modify employee function
export const modifyEmployee = async (e, id, setError, setSuccess, name, email, username, role, schedule, time, phone, setName, setEmail, setUsername, setRole, setTime, setPhone, fetchEmployees, currentPage, setEmployees, setCurrentPage, setTotalPages) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  try {
    const response = await axiosClient.put(`/employees/${id}`, {
      name,
      email,
      username,
      role,
      schedule,
      time,
      phone,
    });
    setSuccess("Employee information updated successfully");
    setName("");
    setEmail("");
    setUsername("");
    setRole("");
    setTime("");
    setPhone("");
    fetchEmployees(currentPage, setEmployees, setCurrentPage, setTotalPages);
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Failed to update employee, please try again!"
    );
  }
};

export const editEmployee = (
  employee,
  setName,
  setEmail,
  setUsername,
  setRole,
  setSchedule,
  setTime,
  setPhone,
  setCurrentEmployeeId
) => {
  setName(employee.name);
  setEmail(employee.email);
  setUsername(employee.username);
  setRole(employee.role);
  setSchedule(employee.schedule);
  setTime(employee.time);
  setPhone(employee.phone);
  setCurrentEmployeeId(employee.id);
};
