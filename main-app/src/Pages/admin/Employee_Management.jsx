import React, { useEffect, useState } from "react";
import "../../assets/css/pages/admin/Management.sass";
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Selectionbox, Outputfetch } from "../../exporter/component_exporter";
import { fetchAllEmployees } from "../../Functions/EmployeeFunctions";
import useAttendanceStatusAdmin from "../../hooks/admin/employee/attendanceStatus";
import useModifyEmployee from "../../hooks/admin/employee/modifyEmployee";

export default function EmployeeManagementPage() {
  // this file is subject for optimization
    Title("Employee Management");
    Body_addclass("Management-PAGE");
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const { modifyEmployee, formData, handleInputChange, updateEmployee, error, success } = useModifyEmployee();
    const { staff } = useAttendanceStatusAdmin();

    //table
    const tbhead = [
        "FIRSTNAME",
        "LASTNAME",
        "EMAIL",
        "PHONE",
        "ROLE",
        "STATUS",
    ];
    const tbrows = users.map((employee) => {

      const staffStatus = staff.find((s) => s.id === employee.id);
      const attendanceStatus = staffStatus && staffStatus.timed_in ? "At Work" : "Not at Work";

      return {
        first: employee.firstname,
        second: employee.lastname,
        third: employee.email,
        fourth: employee.contact,
        fifth: employee.role,
        sixth: attendanceStatus,
        edit: () => modifyEmployee(employee),
        delete: () =>
          removeEmployee(),
      };
    });

    // fetch Employee table
    useEffect(() => {
        fetchAllEmployees(setUsers, setCurrentPage, setTotalPages, currentPage);
    }, [currentPage]);

    // handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" Type="search" />
                        <Inputbox Title="Filter" Type="text" />
                    </Box>
                    <Box Title="EMPLOYEES" UpperRight={ <Button Title="+" OpenModal="AddModal" /> } BoxCol >
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn DeleteBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Last Name" Name="lastname" Type="text" InCol InWhite Value={formData.lastname} onChange={handleInputChange} />
                        <Inputbox Title="First Name" Type="text" InCol InWhite Value={formData.firstname} onChange={handleInputChange} />
                        <Selectionbox Title="Role" Name='name' Options={["Admin", "Employee"]} SltCol SltWhite Value={formData.role} onChange={handleInputChange} />
                        <Inputbox Title="Email" Type="email" InCol InWhite Value={formData.email} onChange={handleInputChange} />
                        <Inputbox Title="Phone" Type="text" InCol InWhite Value={formData.contact} onChange={handleInputChange} />
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
                    OnSubmit={updateEmployee}
                >
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Outputfetch Title="Last Name" Name="lastname" Type="text"  Value={formData.lastname} onChange={handleInputChange} OutCol OutWhite/>
                        <Outputfetch Title="First Name" Name="firstname" Type="text" Value={formData.firstname} onChange={handleInputChange} OutCol OutWhite/>
                        <Selectionbox Title="Role" Name="role" Value={formData.role} SltCol SltWhite Options={['customer', 'employee', 'admin']} option_value={formData.role} OnChange={handleInputChange} />
                        <Outputfetch Title="Email" Name="email" Type="email" Value={formData.email} onChange={handleInputChange} OutCol OutWhite/>
                        <Outputfetch Title="Phone" Name="contact" Type="text" Value={formData.contact} onChange={handleInputChange} OutCol OutWhite/>
                        <Selectionbox Title="Loyalty Status" Name="loyalty" Value={formData.loyalty} SltCol SltWhite Options={['New', 'Regular', 'VIP']} option_value={formData.loyalty} OnChange={handleInputChange} />
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
