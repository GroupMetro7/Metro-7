import React, { use, useEffect, useState } from 'react';
import '../../assets/css/pages/customers/Profile.sass';
import { ScreenWidth, Title, Body_addclass, Main, Section, Box, Button, Table, Footer, Modal, Form, Group, Inputbox, SubmitButton } from '../../Exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider';
import axiosClient from '../../axiosClient';
import useFetchUserRes from '../../hooks/reservation/fetchUserRes';

export default function ProfilePage() {

  // this file is subject for optimization
    const { user, setUser } = useStateContext();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        contact: '',
    });

    const {reservations, preOrders} =useFetchUserRes();

    // Sync form data with user context
    useEffect(() => {
        if (user) {
            setFormData({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '',
                contact: user.contact || '',
            });
        }
    }, [user]);

    // Update form data on input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.put('/user', formData);
            setUser(response.data); // Update user context
            alert('Profile updated successfully!');
            window.location.reload(); // Reload to reflect changes
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    // Page title and body class
    Title('Metro 7')
    Body_addclass('Profile-Customer-PAGE')
    const screenwidth = ScreenWidth()

    const Inputboxes = [
        { Title: 'First Name', Type: 'text', Name: 'firstname', Value: formData.firstname, InCol: true, InWhite: true, onChange: handleInputChange },
        { Title: 'Last Name', Type: 'text', Name: 'lastname', Value: formData.lastname, InCol: true, InWhite: true, onChange: handleInputChange },
        { Title: 'Email', Type: 'email', Name: 'email', Value: formData.email, InCol: true, InWhite: true, onChange: handleInputChange },
        { Title: 'Contact Number', Type: 'number', Name: 'contact', Value: formData.contact, InCol: true, InWhite: true, onChange: handleInputChange }
    ]

    // Table data
    const tbhead = ['ID', 'TABLE TYPE', 'DATE', 'TIME', 'STATUS'];
    const tbrows = reservations.map((res) => ({
        id: res.id,
        resType: res.reservation_type,
        resDate: new Date(res.date).toLocaleDateString(),
        resTime: res.time,
        options: res.status
    }));

    const tbheadOrder = ['ID', 'OPTION', 'DATE', 'BALANCE', 'STATUS'];
    const tbrowsOrder = preOrders.map((order) => ({
        id: order.order_number,
        option: order.option,
        date: new Date(order.created_at).toLocaleDateString(),
        balance: order.unpaid_balance <= 0 ? "Paid" : order.unpaid_balance,
        status: order.status,
        edit: () => {},
    }));

    return (
        <>
            <Main>
                <Section Title="My Profile" Class="myprofile">
                    { screenwidth > 766 ?
                        <Box Class='profile'>
                            <img />
                            <article>
                                <h2>{user?.firstname} {user?.lastname}</h2>
                                <h4>{user?.email}</h4>
                                <h4>{user?.contact}</h4>
                                <h4>{user?.loyalty}</h4>
                            </article>
                            <Button Title='EDIT PROFILE' OpenModal='EditProfile' />
                        </Box>
                        :
                        <Box Class='profile' BoxWrap>
                            <img />
                            <Button Title='EDIT PROFILE' OpenModal='EditProfile' />
                            <article>
                                <h2>{user?.firstname} {user?.lastname}</h2>
                                <h4>{user?.email}</h4>
                                <h4>{user?.contact}</h4>
                                <h4>{user?.loyalty}</h4>
                            </article>
                        </Box>
                    }
                    <Box Title="Order History" Class="orderhistory" BoxCol>
                        <Table HeadRows={tbheadOrder} DataRows={tbrowsOrder} EditBtn />
                    </Box>
                    <Box Title="My Reservations" Class="orderhistory" BoxCol>
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn />
                    </Box>
                </Section>
            </Main>
            <Modal Modal="EditProfile">
                <Form Title="Edit Profile" FormTwolayers OnSubmit={handleSubmit}>
                    <Group Class="inputside" { ...screenwidth > 766 ? { Wrap: true } : { Col: true } }>
                        { Inputboxes.map((input, index) => (
                            <Inputbox key={index} Title={input.Title} Type={input.Type} InCol={input.InCol} InWhite={input.InWhite} Value={input.Value} onChange={input.onChange } />
                        )) }
                    </Group>
                    { screenwidth > 766 ?
                        <Group Class="buttonside">
                            <Button Title="CANCEL" CloseModal BtnWhite />
                            <SubmitButton Title="SUBMIT" BtnWhite />
                        </Group>
                        :
                        <Group Class="buttonside" Col>
                            <SubmitButton Title="SUBMIT" BtnWhite />
                            <Button Title="CANCEL" CloseModal BtnWhite />
                        </Group>
                    }
                </Form>
            </Modal>
        </>
    );
}