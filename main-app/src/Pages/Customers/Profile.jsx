import React, { use, useEffect, useState } from "react";
import "../../assets/css/pages/customers/Profile.sass";
import {
  ScreenWidth,
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
} from "../../Exporter/component_exporter";
import { useStateContext } from "../../Contexts/ContextProvider";
import axiosClient from "../../axiosClient";
import useFetchUserRes from "../../hooks/customer/reservation/fetchUserRes";
import useModifyData from "../../hooks/customer/profile/modifyData";

export default function ProfilePage() {
  // this file is subject for optimization
  const { formData, user, setUser, handleInputChange } = useModifyData();

  const { reservations, preOrders } = useFetchUserRes();

  // Update form data on input change


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.put("/user", {
        ...formData,
        contact: Number(formData.contact),
      });
      setUser(response.data);
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  // Page title and body class
  Title("Metro 7");
  Body_addclass("Profile-Customer-PAGE");
  const screenwidth = ScreenWidth();

  // Table data
  const tbhead = ["ID", "TABLE TYPE", "DATE", "TIME", "STATUS"];
  const tbrows = reservations.map((res) => ({
    id: res.id,
    resType: res.reservation_type,
    resDate: new Date(res.date).toLocaleDateString(),
    resTime: res.time,
    options: res.status,
    edit: () => {
      editData(res)
    },
  }));

  const tbheadOrder = ["ID", "OPTION", "DATE", "BALANCE", "STATUS"];
  const tbrowsOrder = preOrders.map((res) => ({
    id: res.order_number,
    option: res.option,
    date: new Date(res.created_at).toLocaleDateString(),
    balance: res.unpaid_balance <= 0 ? "Paid" : res.unpaid_balance,
    status: res.status,
    view: () => {
      editData(res)
    }
  }));

  return (
    <>
      <Main>
        <Section Title="My Profile" Class="myprofile">
          {screenwidth > 766 ? (
            <Box Class="profile">
              <img
                src={
                  user?.image
                    ? user.image
                    : "../../../public/Icons/profileIcon.jpg"
                }
                alt="Profile"
              />
              <article>
                <h2>
                  {user?.firstname} {user?.lastname}
                </h2>
                <h4>{user?.email}</h4>
                <h4>{user?.contact}</h4>
                <h4>{user?.loyalty}</h4>
              </article>
              <Button Title="EDIT PROFILE" OpenModal="EditProfile" />
            </Box>
          ) : (
            <Box Class="profile" BoxWrap>
              <img />
              <Button Title="EDIT PROFILE" OpenModal="EditProfile" />
              <article>
                <h2>
                  {user?.firstname} {user?.lastname}
                </h2>
                <h4>{user?.email}</h4>
                <h4>{user?.contact}</h4>
                <h4>{user?.loyalty}</h4>
              </article>
            </Box>
          )}
          <Box Title="Order History" Class="orderhistory" BoxCol>
            <Table HeadRows={tbheadOrder} DataRows={tbrowsOrder} ViewBtn />
          </Box>
          <Box Title="My Reservations" Class="orderhistory" BoxCol>
            <Table HeadRows={tbhead} DataRows={tbrows} EditBtn />
          </Box>
        </Section>
      </Main>
      <Modal Modal="EditProfile">
        <Form Title="Edit Profile" FormTwolayers OnSubmit={handleSubmit}>
          <Group
            Class="inputside"
            {...(screenwidth > 766 ? { Wrap: true } : { Col: true })}
          >
            <Inputbox
              Title="First Name"
              Type="text"
              Name="firstname"
              Value={formData.firstname}
              onChange={handleInputChange}
              InCol
              InWhite
            />
            <Inputbox
              Title="Last Name"
              Type="text"
              Name="lastname"
              Value={formData.lastname}
              onChange={handleInputChange}
              InCol
              InWhite
            />
            <Inputbox
              Title="Email"
              Type="email"
              Name="email"
              Value={formData.email}
              onChange={handleInputChange}
              InCol
              InWhite
            />
            <Inputbox
              Title="Contact Number"
              Type="text"
              Name="contact"
              Value={formData.contact}
              onChange={handleInputChange}
              InCol
              InWhite
            />
          </Group>
          {screenwidth > 766 ? (
            <Group Class="buttonside">
              <Button Title="CANCEL" CloseModal BtnWhite />
              <SubmitButton Title="SUBMIT" BtnWhite />
            </Group>
          ) : (
            <Group Class="buttonside" Col>
              <SubmitButton Title="SUBMIT" BtnWhite />
              <Button Title="CANCEL" CloseModal BtnWhite />
            </Group>
          )}
        </Form>
      </Modal>
    </>
  );
}
