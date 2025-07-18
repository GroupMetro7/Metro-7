import React, { useState } from "react";
import "../../Assets/CSS/Pages/Customers/Profile.sass";
import { ScreenWidth, Title, Body_addclass, Main, Section, Box, Button, Table, Outputfetch, Modal, Form, Group, Inputbox, SubmitButton, InsertFileButton, Selectionbox } from "../../Exporter/Component_Exporter";
import { useStateContext } from "../../Contexts/ContextProvider";
import useFetchUserRes from "../../hooks/customer/reservation/fetchUserRes";
import useModifyData from "../../hooks/customer/profile/modifyData";
import useDateTimeFormat from "../../hooks/UI Display/DateTime_Fetch_Format"
// import { useOCRReceipt } from "../../Exporter/Hooks_Exporter"

export default function ProfilePage() {
  // this file is subject for optimization
  const { reservations, preOrders, fetchData } = useFetchUserRes();

  const {
    user,
    formData,
    handleInputChange,
    isLoading,
    handleUpdateUser,
    selectedOrder,
    editData,
    selectedReservation,
    viewOrder,
    deleteReservation,
  } = useModifyData(fetchData);

  // const handleReceiptUpload = useOCRReceipt(setSelectedOrder)

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
    cancel: () => {
      editData(res);
    },
  }));

  const today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;
  const [minDateTime] = useState("");

  const tbheadOrder = ["ID", "OPTION", "DATE", "BALANCE", "STATUS"];
  const tbrowsOrder = preOrders.map((order) => ({
    id: order.order_number,
    option: order.option,
    date: new Date(order.created_at).toLocaleDateString(),
    balance: order.unpaid_balance <= 0 ? "Paid" : order.unpaid_balance,
    status: order.status,
    view: () => viewOrder(order),
  }));

  const Inputboxes = [
    {
      Title: `First Name`,
      Type: `text`,
      ID: `fname-in`,
      Name: `firstname`,
      Value: formData.firstname,
      InCol: true,
      InWhite: true,
      OnChange: handleInputChange,
    },
    {
      Title: `Last Name`,
      Type: `text`,
      ID: `lname-in`,
      Name: `lastname`,
      Value: formData.lastname,
      InCol: true,
      InWhite: true,
      OnChange: handleInputChange,
    },
    {
      Title: `Email`,
      Type: `email`,
      ID: `email-in`,
      Name: `email`,
      Value: formData.email,
      InCol: true,
      InWhite: true,
      OnChange: handleInputChange,
    },
    {
      Title: `Contact Number`,
      Type: `number`,
      ID: `number-in`,
      Name: `contact`,
      Value: formData.contact,
      InCol: true,
      InWhite: true,
      OnChange: handleInputChange,
    },
  ];

  return (
    <>
      <Main>
        <Section Title="My Profile" ID="myprofile">
          {screenwidth > 766 ? (
            <Box Class="profile">
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
          ) : (
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
          )}
          <Box Title="Order History" Class="orderhistory" BoxCol>
            <Table
              Title="OHistory"
              HeadRows={tbheadOrder}
              DataRows={tbrowsOrder}
              ViewBtn
            />
          </Box>
          <Box Title="Reservations" Class="orderhistory" BoxCol>
            <Table
              Title="Reservations"
              HeadRows={tbhead}
              DataRows={tbrows}
              CancelBtn
            />
          </Box>
        </Section>
      </Main>
      <Modal Modal="editprofile-modal">
        <Form Title="Edit Profile" FormTwolayers OnSubmit={handleUpdateUser}>
          <Group Class="imageside">
            <img src="" />
            <InsertFileButton Title="EDIT PICTURE" BtnWhite />
          </Group>
          <Group
            Class="inputside"
            {...(screenwidth > 766 ? { Wrap: true } : { Col: true })}
          >
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
          {screenwidth > 766 ? (
            <Group Class="buttonside">
              <Button Title="CANCEL" CloseModal BtnWhite />
              <SubmitButton
                Title={isLoading ? `SUBMITTING...` : `SUBMIT`}
                ID={`submit-btn`}
                Disabled={isLoading}
                BtnWhite
              />
            </Group>
          ) : (
            <Group Class="buttonside" Col>
              <SubmitButton
                Title={isLoading ? `SUBMITTING...` : `SUBMIT`}
                ID={`submit-btn`}
                Disabled={isLoading}
                BtnWhite
              />
              <Button Title="CANCEL" CloseModal BtnWhite />
            </Group>
          )}
        </Form>
      </Modal>
      <Modal Modal="OHistory-view-modal">
        {selectedOrder && (
          <Form Title="VIEW ORDER" FormThreelayers OnSubmit="">
            <Group Class="outputfetch" Wrap>
              <Outputfetch Title="Order No." Value={selectedOrder.order_number} OutCol OutWhite />
              <Outputfetch
                Title="Order Date"
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
                Title="Customer Name"
                Value={selectedOrder.name}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Options"
                Value={selectedOrder.option}
                OutCol
                OutWhite
              />
            </Group>
            <Group Class="outputfetch orderside" Col>
              <div>
                <Outputfetch Title="Items" OutWhite />
                <Outputfetch Title="Quantity" OutWhite />
                <Outputfetch Title="Unit Price" OutWhite />
                <Outputfetch Title="Total Price" OutWhite />
              </div>
              {selectedOrder.tickets.map((ticket, index) => (
                <div Key={index}>
                  <Outputfetch Value={ticket.product_name} OutWhite />
                  <Outputfetch Value={`x${ticket.quantity}`} OutWhite />
                  <Outputfetch Value={`₱${Number(ticket.unit_price).toFixed(2)}`} OutWhite />
                  <Outputfetch Value={`₱${(Number(ticket.quantity) * Number(ticket.unit_price)).toFixed(2)}`} OutWhite />
                </div>
              ))}
            </Group>
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Total Price"
                Value={selectedOrder.amount}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Discount"
                Value={selectedOrder.discount}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Balance"
                Value={selectedOrder.unpaid_balance}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Down Payment Price"
                Name="downpayment"
                Value={selectedOrder.downpayment || 0}
                OnChange=""
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Reference Number"
                Name="refNumber"
                Value={selectedOrder.reference_Number || "-"}
                OnChange=""
                OutCol
                OutWhite
              />
            </Group>
            {/* <Group Class={`outputfetch`} Col>
              <Outputfetch Title={`QR Code`} OutWhite />
              <Group {...(screenwidth < 767 && { Col: true })}>
                <img />
                <Group Col>
                  <p>
                    Please settle your pending balance.
                  </p>
                  {screenwidth > 766 && (
                    <InsertFileButton Title={`UPLOAD GCASH RECEIPT`} BtnWhite Accept={`image/*`} Name={`image`} OnChange={handleReceiptUpload} />
                  )}
                </Group>
              </Group>
            </Group> */}
            <Group Class="buttonside">
              <Button Title="CLOSE" CloseModal BtnWhite />
              <SubmitButton Title="SAVE" BtnWhite />
            </Group>
          </Form>
        )}
      </Modal>
      <Modal Modal="Reservations-edit-modal">
        {selectedReservation && (
          <Form Title="EDIT RESERVATION" FormThreelayers OnSubmit="">
            <Group
              Class="inputside"
              {...(screenwidth > 766 ? { Wrap: true } : { Col: true })}
            >
              <Outputfetch
                Title="Customer Name"
                Value={selectedReservation.user_id}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Reservation Type"
                Value={selectedReservation.reservation_type}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Date"
                Value={new Date(selectedReservation.date).toLocaleDateString()}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Time"
                Value={selectedReservation.time}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Party size"
                Value={selectedReservation.party_size}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Status"
                Value={selectedReservation.status}
                OutCol
                OutWhite
              />
            </Group>
            <Group Class="buttonside">
              <Button Title="CANCEL" CloseModal BtnWhite />
              <SubmitButton
                Title={isLoading ? `SUBMITTING...` : `SUBMIT`}
                ID={`submit-btn`}
                Disabled={isLoading}
                BtnWhite
              />
            </Group>
          </Form>
        )}
      </Modal>
      <Modal Modal="Reservations-cancel-modal">
        {selectedReservation && 
          <Form Title="CANCEL RESERVATION" FormTwolayers OnSubmit={deleteReservation} >
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Date"
                Value={new Date(
                  selectedReservation.date
                ).toLocaleDateString() + " | " + selectedReservation.time}
                OutCol
                OutWhite
              />
              <Outputfetch Title="Type" Value={selectedReservation.reservation_type} OutCol OutWhite />
            </Group>
            <Group Class="buttonside">
              <Button Title="CANCEL" CloseModal BtnWhite />
              <SubmitButton
                Title={isLoading ? `SUBMITTING...` : `SUBMIT`}
                ID={`submit-btn`}
                Disabled={isLoading}
                BtnWhite
              />
            </Group>
          </Form>
        }
      </Modal>
    </>
  );
}