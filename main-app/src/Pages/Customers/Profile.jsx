import React, { useState } from "react";
import "../../Assets/CSS/Pages/Customers/Profile.sass";
import { ScreenWidth, Title, Body_addclass, Main, Section, Box, Button, Table, Outputfetch, Modal, Form, Group, Inputbox, SubmitButton, InsertFileButton, Selectionbox } from '../../Exporter/Component_Exporter'
import { useStateContext } from "../../Contexts/ContextProvider";
import useFetchUserRes from "../../hooks/customer/reservation/fetchUserRes";
import useModifyData from "../../hooks/customer/profile/modifyData";

export default function ProfilePage() {
  // this file is subject for optimization
  const { user, formData, handleInputChange, isLoading, handleUpdateUser } = useModifyData();

  const { reservations, preOrders } = useFetchUserRes();

  // Page title and body class
  Title(`Metro 7 ${user.firstname ? `| ${user.firstname}` : ""}`);
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

  const today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`
  const [minDateTime] = useState('');

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

    const Inputboxes = [
        { Title: `First Name`, Type: `text`, ID: `fname-in`, Name: `firstname`, Value: formData.firstname, InCol: true, InWhite: true, OnChange: handleInputChange },
        { Title: `Last Name`, Type: `text`, ID: `lname-in`, Name: `lastname`, Value: formData.lastname, InCol: true, InWhite: true, OnChange: handleInputChange },
        { Title: `Email`, Type: `email`, ID: `email-in`, Name: `email`, Value: formData.email, InCol: true, InWhite: true, OnChange: handleInputChange },
        { Title: `Contact Number`, Type: `number`, ID: `number-in`, Name: `contact`, Value: formData.contact, InCol: true, InWhite: true, OnChange: handleInputChange },
    ];

  return (
    <>
      <Main>
        <Section Title="My Profile" Class="myprofile">
          {screenwidth > 766 ? 
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
              <Button Title="EDIT PROFILE" OpenModal="editprofile-modal" />
            </Box>
          : 
            <Box Class="profile" BoxWrap>
              <img />
              <Button Title="EDIT PROFILE" OpenModal="editprofile-modal" />
              <article>
                <h2>
                  {user?.firstname} {user?.lastname}
                </h2>
                <h4>{user?.email}</h4>
                <h4>{user?.contact}</h4>
                <h4>{user?.loyalty}</h4>
              </article>
            </Box>
          }
          <Box Title="Order History" Class="orderhistory" BoxCol>
            <Table Title="OHistory" HeadRows={tbheadOrder} DataRows={tbrowsOrder} ViewBtn />
          </Box>
          <Box Title="My Reservations" Class="orderhistory" BoxCol>
            <Table Title="Reservations" HeadRows={tbhead} DataRows={tbrows} EditBtn CancelBtn />
          </Box>
        </Section>
      </Main>
      <Modal Modal="editprofile-modal">
        <Form Title="Edit Profile" FormTwolayers OnSubmit={handleUpdateUser}>
          <Group Class="imageside">
            <img src="" />
            <InsertFileButton Title="EDIT PICTURE" BtnWhite />
          </Group>
          <Group Class="inputside" {...(screenwidth > 766 ? { Wrap: true } : { Col: true })} >
              {Inputboxes.map((Input, Index) => (
                  <Inputbox
                      Key={Index}
                      Title={Input.Title}
                      Type={Input.Type}
                      ID={Input.ID}
                      Name={Input.Name}
                      InCol={Input.InCol}
                      InWhite={Input.InWhite}
                      Value={Input.Value}
                      OnChange={Input.OnChange}
                  />
              ))}
          </Group>
          {screenwidth > 766 ? 
            <Group Class="buttonside">
              <Button Title="CANCEL" CloseModal BtnWhite />
              <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
            </Group>
          : 
            <Group Class="buttonside" Col>
              <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
              <Button Title="CANCEL" CloseModal BtnWhite />
            </Group>
          }
        </Form>
      </Modal>
      {/* <Modal Modal="OHistory-view-modal">
        {selectedOrder && 
          <Form Title="VIEW ORDER" FormThreelayers OnSubmit="">
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Order No."
                Value=""
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Order Date"
                Value={`${new Date().getFullYear()}-${(
                  new Date().getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}-${new Date()
                  .getDate()
                  .toString()
                  .padStart(2, "0")} | ${new Date(
                  
                ).toLocaleTimeString([], { timeStyle: "short" })}`}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Customer Name"
                Value=""
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Options"
                Value=""
                OutCol
                OutWhite
              />
            </Group>
            <Group Class="outputfetch" Col>
              <div>
                <Outputfetch Title="Items" OutWhite />
                <Outputfetch Title="Quantity" OutWhite />
                <Outputfetch Title="Unit Price" OutWhite />
                <Outputfetch Title="Total Price" OutWhite />
              </div>
              {selectedOrder.tickets.map((ticket, index) => (
                <div>
                  <Outputfetch Value="" OutWhite />
                  <Outputfetch Value={`x$""`} OutWhite />
                  <Outputfetch Value={`₱$""`} OutWhite />
                  <Outputfetch Value={`₱$""`} OutWhite />
                </div>
              ))}
            </Group>
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Total Price"
                Value=""
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Discount"
                Value=""
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Payment Mode"
                Value=""
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Down Payment Price"
                Name="downpayment"
                Value={"₱"}
                OnChange=""
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Reference Number"
                Name="refNumber"
                Value=""
                OnChange=""
                OutCol
                OutWhite
              />
            </Group>
            <Group Class="buttonside">
              <Button Title="CLOSE" CloseModal BtnWhite />
              <SubmitButton Title="SAVE" BtnWhite />
            </Group>
          </Form>
        }
      </Modal> */}
      <Modal Modal="Reservations-edit-modal">
        <Form Title="EDIT RESERVATION" FormThreelayers OnSubmit="">
          <Group Class="inputside" {...(screenwidth > 766 ? { Wrap: true } : { Col: true })} >
            <Outputfetch Title="Customer Name" Value={`${user.firstname} ${user.lastname}`} OutCol OutWhite />                                <Selectionbox
              Title="Reservation Type"
              Name="reservationType"
              Value={formData.reservationType}
              Options={[
                  { label: "Solo", value: "Solo" },
                  { label: "Group", value: "Group" },
                  { label: "Event", value: "Event" },
              ]}
              SltCol
              SltWhite
              OnChange={handleInputChange}
          />
          <Inputbox
              Title="Party Size"
              Type="number"
              Name="partySize"
              Value={formData.partySize}
              InCol
              InWhite
              OnChange={handleInputChange}
          />
          <Inputbox
              Title="Date"
              Type="date"
              Name="date"
              Value={formData.date}
              MinDate={ today }
              InCol
              InWhite
              OnChange={handleInputChange}
          />
          <Inputbox
              Title="Time"
              Type="time"
              Name="time"
              Value={formData.time}
              MinDate={ minDateTime }
              InCol
              InWhite
              OnChange={handleInputChange}
          />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
          </Group>
        </Form>
      </Modal>
      <Modal Modal="Reservations-cancel-modal">
        <Form Title="CANCEL RESERVATION" FormThreelayers OnSubmit="">
          <Group Class="outputfetch" Wrap>
            <Outputfetch
              Title="Customer Name"
              Value={`${user.firstname} ${user.lastname}`}
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Date"
              Value={`${new Date().getFullYear()}-${(
                new Date().getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${new Date()
                .getDate()
                .toString()
                .padStart(2, "0")} | ${new Date().toLocaleTimeString([], {
                timeStyle: "short",
              })}`}
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Type"
              Value="Solo"
              OutCol
              OutWhite
            />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
          </Group>
        </Form>
      </Modal>
    </>
  );
}
