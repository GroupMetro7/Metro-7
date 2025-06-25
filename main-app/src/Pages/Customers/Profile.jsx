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
  Outputfetch,
  Modal,
  Form,
  Group,
  Inputbox,
  SubmitButton,
  InsertFileButton,
} from "../../Exporter/component_exporter";
import axiosClient from "../../axiosClient";
import useFetchUserRes from "../../hooks/customer/reservation/fetchUserRes";
import useModifyData from "../../hooks/customer/profile/modifyData";
import { createWorker } from "tesseract.js";

export default function ProfilePage() {
  // this file is subject for optimization
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { formData, user, setUser, handleInputChange, setOrderData, orderData, handleOrderInputChange, handleUpdatePayment } = useModifyData(selectedOrder);


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
      setSelectedOrder(res);
    },
  }));

  const tbheadOrder = ["ID", "OPTION", "DATE", "BALANCE", "STATUS"];
  const tbrowsOrder = preOrders.map((res) => ({
    id: res.order_number,
    option: res.option,
    date: new Date(res.created_at).toLocaleDateString(),
    balance: res.unpaid_balance <= 0 ? "Paid" : res.unpaid_balance,
    status: res.status,
    edit: () => {
      setSelectedOrder(res);
    },
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
            <Table
              Title="OHistory"
              HeadRows={tbheadOrder}
              DataRows={tbrowsOrder}
              EditBtn
            />
          </Box>
          <Box Title="My Reservations" Class="orderhistory" BoxCol>
            <Table
              Title="Reservations"
              HeadRows={tbhead}
              DataRows={tbrows}
              EditBtn
              CancelBtn
            />
          </Box>
        </Section>
      </Main>
      <Modal Modal="EditProfile">
        <Form Title="Edit Profile" FormTwolayers OnSubmit={handleSubmit}>
          <Group Class="imageside">
            <img src="" />
            <InsertFileButton Title="EDIT PICTURE" BtnWhite />
          </Group>
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
      <Modal Modal="CancelModal-Reservations">
        <Form Title="CANCEL RESERVATION" FormThreelayers OnSubmit={""}>
          <Group Class="outputfetch" Wrap>
            <Outputfetch
              Title="Customer Name"
              Value={`${user.firstname} ${user.lastname}`}
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Date"
              Value={`${new Date().getFullYear()}-${(new Date().getMonth() + 1)
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
            <Outputfetch Title="Type" Value="Solo" OutCol OutWhite />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <SubmitButton Title="SUBMIT" BtnWhite />
          </Group>
        </Form>
      </Modal>

      <Modal Modal="EditModal-OHistory" onClose={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <Form Title="Order Details" FormThreelayers OnSubmit={handleUpdatePayment}>
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Order Number"
                Value={selectedOrder.order_number}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Option"
                Value={selectedOrder.option}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Date"
                Value={new Date(selectedOrder.created_at).toLocaleDateString()}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Balance"
                Value={
                  selectedOrder.unpaid_balance <= 0
                    ? "Paid"
                    : selectedOrder.unpaid_balance
                }
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Status"
                Value={selectedOrder.status}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Reference No."
                Name="refNumber"
                Value={orderData.refNumber || selectedOrder.reference_Number}
                onChange={handleOrderInputChange}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Payment amount"
                Name="downpayment"
                Value={orderData.downpayment || selectedOrder.downpayment}
                onChange={handleOrderInputChange}
                OutCol
                OutWhite
              />
            </Group>
            { selectedOrder.unpaid_balance > 0 ? <Group Class="outputfetch" Col>
              <Outputfetch Title="QR Code" OutWhite />
              <Group>
                <img />
                <Group Col>
                  <p>
                    Please pay a 50% DOWNPAYMENT. Orders without a payment
                    receipt will remain pending. Failure to pay on time will
                    result in cancellation.
                  </p>
                  <InsertFileButton
                    Title="UPLOAD GCASH RECEIPT"
                    BtnWhite
                    Accept={"image/*"}
                    Name="image"
                    OnChange={async (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const worker = await createWorker("eng");
                        await worker.setParameters({
                          tessedit_char_whitelist:
                            "₱0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,",
                        });
                        const {
                          data: { text: rawText },
                        } = await worker.recognize(file);

                        // Fix common OCR error: replace '₱4' or 'Amount: 4' with '₱+' or 'Amount: +'
                        const text = rawText.replace(
                          /(₱|Amount\s*[:\-]?)\s*4(?=[\d,]+\.\d{2})/g,
                          "$1+"
                        );

                        // Extract reference number (example: 10+ digits or alphanumeric)
                        const refMatch =
                          text.match(
                            /(?:Reference\s*No\.?|Ref(?:erence)?\s*#?\s*No\.?)\s*[:\-]?\s*([A-Za-z0-9]{8,})/i
                          ) || text.match(/([0-9]{13,})/);
                        const referenceNumber = refMatch
                          ? refMatch[1]
                          : "Not found";

                        // Extract amount (example: ₱+1234.56 or Amount: +1234.56)
                        const amountMatch =
                          text.match(/₱\s*([+-]?[\d,]+\.\d{2})/) ||
                          text.match(/Amount\s*[:\-]?\s*([+-]?[\d,]+\.\d{2})/i);
                        const amount = amountMatch
                          ? amountMatch[1]
                          : "Not found";

                        const parsedAmount =
                          amount !== "Not found"
                            ? parseFloat(amount.replace(/,/g, ""))
                            : "";

                        console.log("Reference Number:", referenceNumber);
                        console.log("Amount:", parsedAmount);

                        await worker.terminate();
                        setOrderData((prev) => ({
                          ...prev,
                          refNumber: referenceNumber,
                          downpayment: parsedAmount,
                        }));
                      }
                    }}
                  />
                </Group>
              </Group>
            </Group> : null}

            <Group Class="buttonside">
              <Button Title="CLOSE" CloseModal BtnWhite />
              <SubmitButton Title="SUBMIT" BtnWhite />
            </Group>
          </Form>
        )}
      </Modal>
    </>
  );
}
