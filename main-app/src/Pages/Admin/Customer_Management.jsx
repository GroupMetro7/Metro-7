import React from 'react'
import '../../Assets/CSS/Pages/Admin/Management.sass'
import { Main, Group, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Selectionbox, Outputfetch } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useModifyCustomer, useFetchCustomers } from '../../Exporter/Hooks_Exporter'

export default function CustomerManagementPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Customer Management`)
    useBodyAddClass(`Management-PAGE`)

    const screenwidth = useScreenWidth()

    const { users, currentPage, totalPages, handlePageChange, setSearch, search } = useFetchCustomers()
    const { modifyCust, formData, updateCustomer, handleInputChange, error, success} = useModifyCustomer()

    //table
    const tbcustomerslist = {
        head: {
            id: `NO.`,
            name: `NAME`,
            email: `EMAIL`,
            contact: `PHONE`,
            role: `ROLE`,
            loyalty: `LOYALTY`,
        },
        rows: users.map((customer) => ({
            id: customer.id,
            name: `${customer.firstname} ${customer.lastname}`,
            email: customer.email,
            contact: customer.contact,
            role: customer.role,
            loyalty: customer.loyalty,
            edit: () => modifyCust(customer),
        }))
    }

    return (
        <>
            <Main>
                <Box Class="search">
                    <Inputbox Title="Search" Type="search" Value={search} OnChange={(e) => setSearch(e.target.value)} />
                    <Inputbox Title="Filter" Type="text" />
                </Box>
                <Box Title="CUSTOMERS" BoxCol>
                    <Table HeadRows={tbcustomerslist.head} DataRows={tbcustomerslist.rows} EditBtn />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Box>
            </Main>

            <Modal Modal="edit-modal">
                <Form Title="EDIT EMPLOYEE" {...(screenwidth > 1023 ? { FormThreelayers: true } : screenwidth > 766 ? { FormTwolayers: true } : { Col: true })} OnSubmit={updateCustomer} >
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Outputfetch Title="First Name" Name="firstname" Type="text" Value={formData.firstname} onChange={handleInputChange} OutCol OutWhite/>
                        <Outputfetch Title="Last Name" Name="lastname" Type="text"  Value={formData.lastname} onChange={handleInputChange} OutCol OutWhite/>
                        <Selectionbox Title="Role" Name="role" Value={formData.role} SltCol SltWhite Options={['customer', 'employee', 'admin']} option_value={formData.role} OnChange={handleInputChange} />
                        <Outputfetch Title="Email" Name="email" Type="email" Value={formData.email} onChange={handleInputChange} OutCol OutWhite/>
                        <Outputfetch Title="Phone" Name="contact" Type="text" Value={formData.contact} onChange={handleInputChange} OutCol OutWhite/>
                        { formData.role == 'customer' &&
                            <Selectionbox Title="Loyalty Status" Name="loyalty" Value={formData.loyalty} SltCol SltWhite Options={['New', 'Regular', 'VIP']} option_value={formData.loyalty} OnChange={handleInputChange} />
                        }
                    </Group>
                    {screenwidth > 766 ?
                        <Group Class={`buttonside`}>
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                            <SubmitButton Title={`SUBMIT`} ID={`submit-btn`} BtnWhite />
                        </Group>
                        :
                        <Group Class={`buttonside`} Col>
                            <SubmitButton Title={`SUBMIT`} ID={`submit-btn`} BtnWhite />
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                        </Group>
                    }
                </Form>
            </Modal>
        </>
    )
}
