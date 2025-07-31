import React, { useEffect, useState } from "react";
import "../../Assets/CSS/Pages/Admin/Management.sass";
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Selectionbox, Outputfetch } from "../../Exporter/Component_Exporter";
import useAttendanceStatusAdmin from "../../hooks/admin/employee/attendanceStatus";
import useModifyEmployee from "../../hooks/admin/employee/modifyEmployee";
import axiosClient from "../../axiosClient";
import useFetchEmployees from "../../Hooks/service/fetchData";

export default function EmployeeManagementPage() {
  // this file is subject for optimization
    Title("Employee Management");
    Body_addclass("Management-PAGE");
    const {users, currentPage, totalPages, handlePageChange, setSearch, search} = useFetchEmployees();
    const { modifyEmployee, formData, handleInputChange, updateEmployee, error, success } = useModifyEmployee();
    const { staff } = useAttendanceStatusAdmin();

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



    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" Type="search" Value={search} OnChange={(e) => setSearch(e.target.value)} />
                        <Inputbox Title="Filter" Type="text" />
                    </Box>
                    <Box Title="EMPLOYEES" BoxCol >
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="add-modal">
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
                        <Inputbox Title="Last Name" Name="lastname" Type="text" InCol InWhite Value={formData.lastname} OnChange={handleInputChange} />
                        <Inputbox Title="First Name" Type="text" InCol InWhite Value={formData.firstname} OnChange={handleInputChange} />
                        <Selectionbox Title="Role" Name='name' Options={["Admin", "Employee"]} SltCol SltWhite Value={formData.role} OnChange={handleInputChange} />
                        <Inputbox Title="Email" Type="email" InCol InWhite Value={formData.email} OnChange={handleInputChange} />
                        <Inputbox Title="Phone" Type="text" InCol InWhite Value={formData.contact} OnChange={handleInputChange} />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CLOSE" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal="edit-modal">
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
                        { formData.role == 'customer' &&
                            <Selectionbox Title="Loyalty Status" Name="loyalty" Value={formData.loyalty} SltCol SltWhite Options={['New', 'Regular', 'VIP']} option_value={formData.loyalty} OnChange={handleInputChange} />
                        }
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
