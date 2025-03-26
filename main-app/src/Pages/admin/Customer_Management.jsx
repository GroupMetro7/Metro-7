import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination } from '../../exporter/component_exporter'
import axiosClient from '../../axiosClient'
import { addCustomer, editCustomer, modifyCustomer, fetchCustomers, removeCustomer } from '../../Functions/CustomersFunctions'

export default function CustomerManagementPage() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    const [Customers, setCustomers] = useState([]);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loyalty, setLoyalty] = useState('');
    const [balance, setBalance] = useState('');
    const [total_spent, setTotalSpent] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCustomerId, setCurrentCustomerId] = useState('');

    const tbhead = ['No.#', 'First name', 'Last name', 'EMAIL', 'LOYALTY', 'Total spent', 'BALANCE', 'Last Updated']
    const tbrows = Customers.map(customer => ({
      first: customer.id,
      second: customer.firstname,
      third: customer.lastname,
      fourth: customer.email,
      fifth: customer.loyalty,
      sixth: customer.total_spent,
      seventh: customer.balance,
      lastUpdated: new Date(customer.updated_at).toLocaleString(),
      edit: () => editCustomer(customer, setFirstName, setLastName, setEmail, setLoyalty, setBalance, setTotalSpent, setCurrentCustomerId),
      delete: () => removeCustomer(customer.id, setError, setSuccess, Customers, setCustomers),
    }));

  useEffect(() => {
      fetchCustomers(currentPage, setCustomers, setCurrentPage, setTotalPages);
  }, [currentPage]);

  // handle page change
  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

    return(
        <>
        <Group>
            <Main>
                <Box Class="search">
                    <Inputbox Title="Search" Type="search" />
                    <Inputbox Title="Filter" Type="text" />
                </Box>
                <Box Title="CUSTOMERS" UpperRight={ <Button Title="+" OpenModal="AddModal"/> } BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } EditBtn Deletebtn />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Box>
            </Main>
        </Group>
        <Modal Modal="AddModal">
            <Form Title="ADD CUSTOMER" FormTwolayers OnSubmit={(e)=> addCustomer(e, firstname, lastname, email, loyalty, total_spent, balance, setError, setSuccess, currentPage, setCustomers, setCurrentPage, setTotalPages, fetchCustomers)}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
                <Group Class='inputside' Wrap>
                    <Inputbox Title='First Name' Type='text' InCol InWhite Value={firstname} onChange={(e)=>setFirstName(e.target.value)}/>
                    <Inputbox Title='Last Name' Type='text' InCol InWhite Value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
                    <Inputbox Title='Email' Type='email' InCol InWhite Value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <Inputbox Title='Loyalty' Type='text' InCol InWhite Value={loyalty} onChange={(e)=>setLoyalty(e.target.value)}/>
                    <Inputbox Title='Balance' Type='number' InCol InWhite Value={balance} onChange={(e)=>setBalance(e.target.value)}/>
                    <Inputbox Title='Total spent' Type='number' InCol InWhite Value={total_spent} onChange={(e)=>setTotalSpent(e.target.value)}/>
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CLOSE" CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal="EditModal">
            <Form Title="EDIT CUSTOMER" FormTwolayers OnSubmit={(e) => modifyCustomer(e, currentCustomerId, firstname, lastname, email, loyalty, total_spent, balance, setFirstName, setLastName, setEmail, setLoyalty, setBalance, setTotalSpent, setSuccess, setError, Customers, currentPage, setCustomers, setCurrentPage, setTotalPages)}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
                <Group Class='inputside' Wrap>
                    <Inputbox Title='First Name' Type='text' InCol InWhite Value={firstname} onChange={(e)=>setFirstName(e.target.value)}/>
                    <Inputbox Title='Last Name' Type='text' InCol InWhite Value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
                    <Inputbox Title='Email' Type='email' InCol InWhite Value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <Inputbox Title='Loyalty' Type='text' InCol InWhite Value={loyalty} onChange={(e)=>setLoyalty(e.target.value)}/>
                    <Inputbox Title='Balance' Type='number' InCol InWhite Value={balance} onChange={(e)=>setBalance(e.target.value)}/>
                    <Inputbox Title='Total spent' Type='number' InCol InWhite Value={total_spent} onChange={(e)=>setTotalSpent(e.target.value)}/>
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CLOSE" CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        </>
    )
}
