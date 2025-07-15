import React, { useEffect, useState } from 'react'
import '../../Assets/CSS/Pages/Admin/Management.sass'
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Selectionbox, Outputfetch } from '../../Exporter/Component_Exporter'
import useModifyCustomer from '../../hooks/admin/customer_management/modifyCustomer';
import axiosClient from '../../axiosClient';

export default function CustomerManagementPage() {
    // this file is subject for optimization
    Title("Employee Management");
    Body_addclass("Management-PAGE");
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const { modifyCust, formData, updateCustomer, handleInputChange, error, success} = useModifyCustomer();

    const fetchCustomers = async (page) => {
      axiosClient.get(`/customers?page=${page}`).then(({data}) => {
        setUsers(data.data);
        setCurrentPage(data.current_page);
        setTotalPages(data.last_page);
      })
    }

    useEffect(()=> {
      fetchCustomers(currentPage);
    }, [currentPage]);

    //table
    const tbhead = [
        "FULL NAME",
        "EMAIL",
        "PHONE",
        "LOYALTY",
        "ROLE",
    ];
    const tbrows = users.map((customer) => ({
            fullname: `${customer.firstname} ${customer.lastname}`,
            email: customer.email,
            phone: customer.contact,
            loyalty: customer.loyalty,
            role: customer.role,
            edit: () => modifyCust(customer),
            delete: () => removeCustomer(),
        }));


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
                    <Box Title="CUSTOMERS" BoxCol>
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="edit-modal">
                <Form
                    Title="EDIT CUSTOMER"
                    FormThreelayers
                    OnSubmit={updateCustomer}
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
