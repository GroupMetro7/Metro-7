import axiosClient from "../axiosClient";

//add employee

export const addEmployee = async (e, name, email, phone, username, role, schedule, time, setError, setSuccess, fetchEmployees, currentPage) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        await axiosClient.post('/employees', {
            name: name,
            email: email,
            phone: phone,
            username: username,
            role: role,
            schedule: schedule,
            time: time,
        });
        setSuccess('Employee added successfully');
        fetchEmployees(currentPage);
        window.location.reload();
    } catch (error) {
        setError('An error occurred');
    }
};

//remove employee

export const removeEmployee = async (id, setError, setSuccess, Employees, setEmployees) => {
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


