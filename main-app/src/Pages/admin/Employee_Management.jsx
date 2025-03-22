import React, { useEffect, useState } from 'react';
import '../../assets/css/pages/admin/Management.sass';
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination } from '../../exporter/component_exporter';
import { addEmployee, removeEmployee } from '../../Functions/EmployeeFunctions';
import axiosClient from '../../axiosClient';

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
    const [currentPage, setCurrentPage] = useState(1);
    const [Employees, setEmployees] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
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
        delete: ()=> removeEmployee(employee.id, setError, setSuccess, Employees, setEmployees),
    }));

    // fetch Employee table
    useEffect(() => {
        fetchEmployees(currentPage);
    }, [currentPage]);

    const fetchEmployees = (page) => {
        axiosClient.get(`/employees?page=${page}`).then(({ data }) => {
            setEmployees(data.data);
            setCurrentPage(data.current_page);
            setTotalPages(data.last_page);
        });
    };

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
                <Form Title="ADD EMPLOYEE" FormThreelayers OnSubmit={(e) => addEmployee(e, name, email, phone, username, role, schedule, time, setError, setSuccess, fetchEmployees, currentPage)}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <Group Class='inputside' Wrap>
                        <Inputbox Title='Name' Type='text' InCol InWhite Value={name} onChange={(e) => setName(e.target.value)} />
                        <Inputbox Title='Email' Type='email' InCol InWhite Value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Inputbox Title='Role' Type='text' InCol InWhite Value={role} onChange={(e) => setRole(e.target.value)} />
                        <Inputbox Title='Username' Type='text' InCol InWhite Value={username} onChange={(e) => setUsername(e.target.value)} />
                        <Inputbox Title='Phone' Type='text' InCol InWhite Value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <Inputbox Title='Schedule' Type='text' InCol InWhite Value={schedule} onChange={(e) => setSchedule(e.target.value)} />
                        <Inputbox Title='Time' Type='text' InCol InWhite Value={time} onChange={(e) => setTime(e.target.value)} />
                    </Group>
                    <Group Class='buttonside'>
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal="EditModal">
                <Form Title="EDIT EMPLOYEE" FormThreelayers>
                    <Group Class='inputside' Wrap>
                        <Inputbox Title='No.' Type='number' InCol InWhite />
                        <Inputbox Title='First Name' Type='text' InCol InWhite />
                        <Inputbox Title='Last Name' Type='text' InCol InWhite />
                        <Inputbox Title='Email' Type='email' InCol InWhite />
                        <Inputbox Title='Role' Type='text' InCol InWhite />
                        <Inputbox Title='Schedule' Type='text' InCol InWhite />
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
