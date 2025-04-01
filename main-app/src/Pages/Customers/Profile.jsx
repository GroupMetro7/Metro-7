import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/customers/Profile.sass'
import { Title, Body_addclass, Main, Section, Box, Button, Table, Footer, Modal, Form, Group, Inputbox, SubmitButton } from '../../exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider';
import axiosClient from '../../axiosClient';

export default function ProfilePage() {
    const { user, setUser } = useStateContext();
    const [firstname, setFirstName] = useState(user.firstname);
    const [lastname, setLastName] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [contact, setContact] = useState(user.contact);

    useEffect(() => {
      if (user) {
          setFirstName(user.firstname);
          setLastName(user.lastname);
          setEmail(user.email);
          setContact(user.contact);
      }
  }, [user]);

    Title('Metro 7')
    Body_addclass('Profile-Customer-PAGE')

    const tbhead = ['ORDER NO.', 'ORDER DATE', 'OPTIONS', 'AMOUNT', 'STATUS']
    const tbrows = [
        [<>234567</>, <>2025-02-24 <br /> 02:27:25</>, <>TAKE OUT</>, <>₱559.00</>, 'PENDING'],
        [<>181818</>, <>2025-02-22 <br /> 02:27:25</>, <>TAKE OUT</>, <>₱358.00</>, 'PAID'],
        [<>176923</>, <>2025-01-08 <br /> 03:33:03</>, <>DINE-IN</>, <>₱1,258.00</>, 'PAID']
    ]

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axiosClient.put('/user', {
              firstname,
              lastname,
              email,
              contact,
          });
          setUser(response.data); // Update the user context with the new data
          alert('Profile updated successfully!');
          window.location.reload();
      } catch (error) {
          console.error('Failed to update profile:', error);
          alert('Failed to update profile. Please try again.');
      }
  };

    return(
        <>
        <Main>
            <Section Title='My Profile' Class='myprofile'>
                <Box Class='profile'>
                    <img />
                    <article>
                        <h2>{user.firstname} {user.lastname}</h2>
                        <h4>{user.email}</h4>
                        <h4>{user.contact}</h4>
                        <h4>SILVER</h4>
                    </article>
                    <Button Title='EDIT PROFILE' OpenModal='EditProfile' />
                </Box>
                <Box Title='Order History' Class='orderhistory' BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } ViewBtn />
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
                            Value={firstname}
                            InCol
                            InWhite
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Inputbox
                            Title="Last Name"
                            Type="text"
                            Value={lastname}
                            InCol
                            InWhite
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Inputbox
                            Title="Email"
                            Type="email"
                            Value={email}
                            InCol
                            InWhite
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Inputbox
                            Title="Contact Number"
                            Type="number"
                            Value={contact}
                            InCol
                            InWhite
                            onChange={(e) => setContact(e.target.value)}
                        />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
        </>
    )
}
