import React, { useEffect, useState } from "react";
import "../../assets/css/pages/admin/Management.sass";
import {
    Title,
    Body_addclass,
    Group,
    Main,
    Box,
    Inputbox,
    Table,
    Button,
    Modal,
    Form,
    SubmitButton,
    Pagination,
    Selectionbox,
} from "../../exporter/component_exporter";
import {
    modifyEmployee,
    editEmployee,
    fetchAllEmployees,
} from "../../Functions/EmployeeFunctions";

export default function EmployeeManagementPage() {
  // this file is subject for optimization
    Title("Employee Management");
    Body_addclass("Management-PAGE");
    // variables for Employee table
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        role: "",
    });
    const [currentEmployeeId, setCurrentEmployeeId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    //table
    const tbhead = [
        "FIRSTNAME",
        "LASTNAME",
        "EMAIL",
        "PHONE",
        "ROLE",
        "LAST LOGGED",
    ];
    const tbrows = users
        .map((employee) => ({
            first: employee.firstname,
            second: employee.lastname,
            third: employee.email,
            fourth: employee.contact,
            fifth: employee.role,
            lastUpdated: new Date(employee.updated_at).toLocaleString(),
            edit: () => editEmployee(employee, setFormData, setCurrentEmployeeId),
            delete: () =>
                removeEmployee(
                    employee.id,
                    setError,
                    setSuccess,
                    Employees,
                    setEmployees
                ),
        }));

    // fetch Employee table
    useEffect(() => {
        fetchAllEmployees(setUsers, setError, setCurrentPage, setTotalPages, currentPage);
    }, [currentPage]);

    // handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" Type="search" />
                        <Inputbox Title="Filter" Type="text" />
                    </Box>
                    <Box
                        Title="EMPLOYEES"
                        UpperRight={<Button Title="+" OpenModal="AddModal" />}
                        BoxCol
                    >
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn Deletebtn />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="AddModal">
                <Form
                    Title="ADD EMPLOYEE"
                    FormThreelayers
                    OnSubmit={(e) =>
                        addEmployee(
                            e,
                            email,
                            phone,
                            username,
                            role,
                            schedule,
                            time,
                            setError,
                            setSuccess,
                            currentPage,
                            setCurrentPage,
                            setTotalPages
                        )
                    }
                >
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <Group Class="inputside" Wrap>
                        <Inputbox
                            Title="Last Name"
                            Name="lastname"
                            Type="text"
                            InCol
                            InWhite
                            Value={formData.lastname}
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="First Name"
                            Type="text"
                            InCol
                            InWhite
                            Value={formData.firstname}
                            onChange={handleInputChange}
                        />
                        <Selectionbox
                            Title="Role"
                            Name='name'
                            Options={["Admin", "Employee"]}
                            SltCol
                            SltWhite
                            Value={formData.role}
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Email"
                            Type="email"
                            InCol
                            InWhite
                            Value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Phone"
                            Type="text"
                            InCol
                            InWhite
                            Value={formData.contact}
                            onChange={handleInputChange}
                        />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CLOSE" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal="EditModal">
                <Form
                    Title="EDIT EMPLOYEE"
                    FormThreelayers
                    OnSubmit={(e) =>
                        modifyEmployee(
                            e,
                            currentEmployeeId, // Pass the ID of the employee being edited
                            formData,
                            setFormData,
                            fetchAllEmployees,
                            setSuccess,
                            setError,
                            setCurrentPage,
                            currentPage,
                            setTotalPages
                        )
                    }
                >
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox
                            Title="Last Name"
                            Name="lastname"
                            Type="text"
                            InCol
                            InWhite
                            Value={formData.lastname}
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="First Name"
                            Name="firstname"
                            Type="text"
                            InCol
                            InWhite
                            Value={formData.firstname}
                            onChange={handleInputChange}
                        />
                        <Selectionbox
                            Title="Role"
                            Name="role"
                            Value={formData.role}
                            SltCol
                            SltWhite
                            Options={['customer', 'employee', 'admin']}
                            option_value={formData.role}
                            InCol
                            InWhite
                            OnChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Email"
                            Name="email"
                            Type="email"
                            InCol
                            InWhite
                            Value={formData.email}
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Phone"
                            Name="contact"
                            Type="text"
                            InCol
                            InWhite
                            Value={formData.contact}
                            onChange={handleInputChange}
                        />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
        </>
    );
}
