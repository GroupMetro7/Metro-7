import React, { useEffect, useState } from 'react';
import '../../assets/css/pages/customers/Profile.sass';
import {
    Title,
    Body_addclass,
    Main,
    Section,
    Box,
    Button,
    Table,
    Footer,
    Modal,
    Form,
    Group,
    Inputbox,
    SubmitButton,
} from '../../exporter/component_exporter';
import { useStateContext } from '../../Contexts/ContextProvider';
import axiosClient from '../../axiosClient';

export default function ProfilePage() {
    const { user, setUser } = useStateContext();
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        contact: '',
    });

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
    Title('Metro 7');
    Body_addclass('Profile-Customer-PAGE');

    // Table data
    const tbhead = ['ORDER NO.', 'ORDER DATE', 'OPTIONS', 'AMOUNT', 'STATUS'];
    const tbrows = [
        [<>234567</>, <>2025-02-24 <br /> 02:27:25</>, <>TAKE OUT</>, <>₱559.00</>, 'PENDING'],
        [<>181818</>, <>2025-02-22 <br /> 02:27:25</>, <>TAKE OUT</>, <>₱358.00</>, 'PAID'],
        [<>176923</>, <>2025-01-08 <br /> 03:33:03</>, <>DINE-IN</>, <>₱1,258.00</>, 'PAID'],
    ];

    return (
        <>
            <Main>
                <Section Title="My Profile" Class="myprofile">
                    <Box Class="profile">
                        <img alt="Profile" />
                        <article>
                            <h2>{user?.firstname} {user?.lastname}</h2>
                            <h4>{user?.email}</h4>
                            <h4>{user?.contact}</h4>
                            <h4>{user?.loyalty}</h4>
                        </article>
                        <Button Title="EDIT PROFILE" OpenModal="EditProfile" />
                    </Box>
                    <Box Title="Order History" Class="orderhistory" BoxCol>
                        <Table HeadRows={tbhead} DataRows={tbrows} ViewBtn />
                    </Box>
                </Section>
            </Main>
            <Footer />
            <Modal Modal="EditProfile">
                <Form Title="Edit Profile" FormTwolayers OnSubmit={handleSubmit}>
                    <Group Class="inputside" Wrap>
                        <Inputbox
                            Title="First Name"
                            Type="text"
                            Name="firstname"
                            Value={formData.firstname}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Last Name"
                            Type="text"
                            Name="lastname"
                            Value={formData.lastname}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Email"
                            Type="email"
                            Name="email"
                            Value={formData.email}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Contact Number"
                            Type="number"
                            Name="contact"
                            Value={formData.contact}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
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
