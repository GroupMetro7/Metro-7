import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Selectionbox, Outputfetch } from '../../exporter/component_exporter'
import { editCustomer, fetchAllUsers, modify } from '../../Functions/CustomersFunctions'

export default function CustomerManagementPage() {
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
        loyalty: "",
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
    ];
    const tbrows = users
        .map((customer) => ({
            fullname: `${customer.firstname} ${customer.lastname}`,
            email: customer.email,
            phone: customer.contact,
            loyalty: customer.loyalty,
            role: customer.role,
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
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn DeleteBtn />
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
