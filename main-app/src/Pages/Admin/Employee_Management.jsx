import React from 'react'
import '../../Assets/CSS/Pages/Admin/Management.sass'
import { Main, Group, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Selectionbox, Outputfetch } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useFetchEmployees, useModifyEmployee, useAttendanceStatusAdmin } from '../../Exporter/Hooks_Exporter'

export default function EmployeeManagementPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Employee Management`)
    useBodyAddClass(`Management-PAGE`)

    const screenwidth = useScreenWidth()

    const {users, currentPage, totalPages, handlePageChange, setSearch, search} = useFetchEmployees()
    const { modifyEmployee, formData, handleInputChange, updateEmployee, error, success } = useModifyEmployee()
    const { staff } = useAttendanceStatusAdmin()

    const handleAddEmployeeSubmit = (e) => {
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

    const tbemployeelist = {
        head: {
            id: `NO.`,
            name: `NAME`,
            email: `EMAIL`,
            contact: `PHONE`,
            role: `ROLE`,
            status: `STATUS`,
        },
        rows: users.map((employee) => ({
            id: employee.id,
            name: `${employee.firstname} ${employee.lastname}`,
            email: employee.email,
            contact: employee.contact,
            role: employee.role,
            status: staff.find((s) => s.id === employee.id)?.timed_in ? "At Work" : "Not at Work",
            edit: () => modifyEmployee(employee),
        }))
    }


    return (
        <>
            <Main>
                <Box Class="search">
                    <Inputbox Title="Search" Type="search" Value={search} OnChange={(e) => setSearch(e.target.value)} />
                    <Inputbox Title="Filter" Type="text" />
                </Box>
                <Box Title="EMPLOYEES" BoxCol >
                    <Table HeadRows={tbemployeelist.head} DataRows={tbemployeelist.rows} EditBtn />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Box>
            </Main>

            <Modal Modal="edit-modal">
                <Form Title="EDIT EMPLOYEE" {...(screenwidth > 1023 ? { FormThreelayers: true } : screenwidth > 766 ? { FormTwolayers: true } : { Col: true })} OnSubmit={updateEmployee} >
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
