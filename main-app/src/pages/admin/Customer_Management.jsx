import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Selectionbox } from '../../exporter/component_exporter'
import { editCustomer, fetchAllUsers, modify } from '../../Functions/CustomersFunctions'

export default function CustomerManagementPage() {
    Title("Employee Management");
    Body_addclass("Management-PAGE");
    // variables for Employee table
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        contact: "",
        role: "",
        loyalty: "",
        balance: "",
        total_spent: "",
    });
    const [currentCustomerId, setCurrentCustomerId] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    //table
    const tbhead = [
        "FULL NAME",
        "EMAIL",
        "PHONE",
        "LOYALTY",
        "ROLE",
        "BALANCE",
        "TOTAL SPENT",
        "ACTIONS",
    ];
    const tbrows = users
        .map((customer) => ({
            fullname: `${customer.firstname} ${customer.lastname}`,
            email: customer.email,
            phone: customer.contact,
            loyalty: customer.loyalty,
            role: customer.role,
            balance: customer.balance,
            total_spent: customer.total_spent,
            edit: () => editCustomer(customer, setFormData, setCurrentCustomerId),
            delete: () => removeCustomer(),
        }));

    // fetch Employee table
    useEffect(() => {
        fetchAllUsers(setUsers, setError, setCurrentPage, setTotalPages, currentPage);
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
                    <Box Title="CUSTOMERS" UpperRight={<Button Title="+" OpenModal="AddModal" />} BoxCol>
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn Deletebtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="EditModal">
                <Form
                    Title="EDIT CUSTOMER"
                    FormThreelayers
                    OnSubmit={(e) =>
                        modify(
                            e,
                            currentCustomerId, // Pass the ID of the employee being edited
                            formData,
                            setFormData,
                            fetchAllUsers,
                            setSuccess,
                            setError,
                            setCurrentPage,
                            setTotalPages,
                            currentPage,
                        )
                    }
                >
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Last Name" Name="lastname" Type="text" InCol InWhite Value={formData.lastname} onChange={handleInputChange} />
                        <Inputbox Title="First Name" Name="firstname" Type="text" InCol InWhite Value={formData.firstname} onChange={handleInputChange} />
                        <Selectionbox Title="Role" Name="role" Value={formData.role} SltCol SltWhite Options={['customer', 'employee', 'admin']} option_value={formData.role} InCol InWhite OnChange={handleInputChange} />
                        <Inputbox Title="Email" Name="email" Type="email" InCol InWhite Value={formData.email} onChange={handleInputChange} />
                        <Inputbox Title="Phone" Name="contact" Type="text" InCol InWhite Value={formData.contact} onChange={handleInputChange} />
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
