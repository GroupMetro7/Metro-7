import React, { useEffect, useState } from 'react';
import '../../assets/css/pages/admin/Management.sass';
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination } from '../../exporter/component_exporter';
import { addEmployee, removeEmployee, modifyEmployee, editEmployee, fetchEmployees } from '../../Functions/EmployeeFunctions';

export default function EmployeeManagementPage() {
    Title('Employee Management');
    Body_addclass('Management-PAGE');
    // variables for Employee table
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [schedule, setSchedule] = useState('');
    const [time, setTime] = useState('');
    const [phone, setPhone] = useState('');
    const [currentEmployeeId, setCurrentEmployeeId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [Employees, setEmployees] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    //table
    const tbhead = ['EMP. NO.', 'EMP. NAME', 'EMAIL', 'USERNAME', 'ROLE', 'SCHEDULE', 'TIME', 'LAST LOGGED'];
    const tbrows = Employees.map(employee => ({
        first: employee.employee_number,
        second: employee.name,
        third: employee.email,
        fourth: employee.username,
        fifth: employee.role,
        sixth: employee.schedule,
        seventh: employee.time,
        lastUpdated: new Date(employee.updated_at).toLocaleString(),
        edit: ()=> editEmployee(employee, setName, setEmail, setUsername, setRole, setSchedule, setTime, setPhone, setCurrentEmployeeId),
        delete: ()=> removeEmployee(employee.id, setError, setSuccess, Employees, setEmployees),
    }));

    // fetch Employee table
    useEffect(() => {
      fetchEmployees(currentPage, setEmployees, setCurrentPage, setTotalPages);
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
                    <Box Title="EMPLOYEES" UpperRight={<Button Title="+" OpenModal="AddModal" />} BoxCol>
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn Deletebtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="AddModal">
                <Form Title="ADD EMPLOYEE" FormThreelayers OnSubmit={(e) => addEmployee(e, name, email, phone, username, role, schedule, time, setError, setSuccess, fetchEmployees, currentPage, setEmployees, setCurrentPage, setTotalPages)}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <Group Class='inputside' Wrap>
                        <Inputbox Title='Name' Type='text' InCol InWhite Value={name} OnChange={(e) => setName(e.target.value)} />
                        <Inputbox Title='Email' Type='email' InCol InWhite Value={email} OnChange={(e) => setEmail(e.target.value)} />
                        <Inputbox Title='Role' Type='text' InCol InWhite Value={role} OnChange={(e) => setRole(e.target.value)} />
                        <Inputbox Title='Username' Type='text' InCol InWhite Value={username} OnChange={(e) => setUsername(e.target.value)} />
                        <Inputbox Title='Phone' Type='text' InCol InWhite Value={phone} OnChange={(e) => setPhone(e.target.value)} />
                        <Inputbox Title='Schedule' Type='text' InCol InWhite Value={schedule} OnChange={(e) => setSchedule(e.target.value)} />
                        <Inputbox Title='Time' Type='text' InCol InWhite Value={time} OnChange={(e) => setTime(e.target.value)} />
                    </Group>
                    <Group Class='buttonside'>
                        <Button Title="CLOSE" CloseModal BtnWhite/>
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal="EditModal">
                <Form Title="EDIT EMPLOYEE" FormThreelayers OnSubmit={(e) => modifyEmployee(e, currentEmployeeId, setError, setSuccess, name, email, username, role, schedule, time, phone, setName, setEmail, setUsername, setRole, setTime, setPhone, fetchEmployees, currentPage, setEmployees, setCurrentPage, setTotalPages)}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                    <Group Class='inputside' Wrap>
                        <Inputbox Title='Name' Type='text' InCol InWhite Value={name} OnChange={(e) => setName(e.target.value)} />
                        <Inputbox Title='Email' Type='email' InCol InWhite Value={email} OnChange={(e) => setEmail(e.target.value)} />
                        <Inputbox Title='Role' Type='text' InCol InWhite Value={role} OnChange={(e) => setRole(e.target.value)} />
                        <Inputbox Title='Username' Type='text' InCol InWhite Value={username} OnChange={(e) => setUsername(e.target.value)} />
                        <Inputbox Title='Phone' Type='text' InCol InWhite Value={phone} OnChange={(e) => setPhone(e.target.value)} />
                        <Inputbox Title='Schedule' Type='text' InCol InWhite Value={schedule} OnChange={(e) => setSchedule(e.target.value)} />
                        <Inputbox Title='Time' Type='text' InCol InWhite Value={time} OnChange={(e) => setTime(e.target.value)} />
                    </Group>
                    <Group Class='buttonside'>
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Modal>
        </>
    );
}
