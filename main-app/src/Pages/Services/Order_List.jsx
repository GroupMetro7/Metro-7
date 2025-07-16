import React, { useEffect, useState } from "react";
import "../../Assets/CSS/Pages/Services/Management.sass";
import {
  Title,
  Body_addclass,
  Group,
  Main,
  Box,
  Inputbox,
  Table,
  Button,
  Modal,
  Form,
  Outputfetch,
  SubmitButton,
  Selectionbox,
  InsertFileButton,
  Pagination,
} from "../../Exporter/Component_Exporter";
import useSearchItem from "../../hooks/searchItem";
import useFetchOrder from "../../hooks/orders/fetchOrder";
import { createWorker } from "tesseract.js";
import useModifyOrderList from "../../hooks/orders/modifyOrderList";
import { useStateContext, useScreenWidth, useOCRReceipt } from '../../Exporter/Hooks_Exporter'

export default function StaffOrderList() {
  Title("Order List");
  Body_addclass("Management-PAGE");
  // optimized, need to add pre orders tab
  const {
    orders,
    selectedOrder,
    setSelectedOrder,
    currentPage,
    totalPages,
    handlePageChange,
    setSearchItem,
    fetchOrder,
  } = useFetchOrder();

  const { formData, setFormData, handleUpdateOrder, error, success } =
    useModifyOrderList(selectedOrder, fetchOrder);

              const handleReceiptUpload = useOCRReceipt({ setFormData })

  const tbhead = [
    "ORDER NO.",
    "CUSTOMER",
    "AMOUNT",
    "DISCOUNT",
    "BALANCE",
    "OPTION",
    "STATUS",
  ];
  const tbrowsOrders = orders.map((order) => ({
    orderId: order.order_number,
    name: order.name,
    amount: order.amount,
    discount: order.discount,
    balance: order.unpaid_balance <= 0 ? "Paid" : order.unpaid_balance,
    option: order.option,
    status: order.status,
    edit: () => {
      setSelectedOrder(order);
    },
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox
              Type="search"
              Title="Search"
              OnChange={(e) => setSearchItem(e.target.value)}
              Placeholder="Search Order number"
            />
          </Box>
          <Box Title="ORDER" BoxCol>
            <Table HeadRows={tbhead} DataRows={tbrowsOrders} EditBtn />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Main>
      </Group>

      {/* Modal to display tickets for the selected order */}

      <Modal Modal="edit-modal" onClose={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <Form Title="EDIT ORDER" FormThreelayers OnSubmit={handleUpdateOrder}>
            {(error && (
              <Group Class="signalside">
                <p class="error">{error}</p>
              </Group>
            )) ||
              (success && (
                <Group Class="signalside">
                  <p class="success">{success}</p>
                </Group>
              ))}
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Order No."
                Value={selectedOrder.order_number}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Order Date"
                Value={`${new Date(selectedOrder.created_at).getFullYear()}-${(
                  new Date(selectedOrder.created_at).getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}-${new Date(selectedOrder.created_at)
                  .getDate()
                  .toString()
                  .padStart(2, "0")} | ${new Date(
                  selectedOrder.created_at
                ).toLocaleTimeString([], { timeStyle: "short" })}`}
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
            <Group Class="outputfetch" Col>
              <div>
                <Outputfetch Title="Items" OutWhite />
                <Outputfetch Title="Quantity" OutWhite />
                <Outputfetch Title="Unit Price" OutWhite />
                <Outputfetch Title="Total Price" OutWhite />
              </div>
              {selectedOrder.tickets.map((ticket, index) => (
                <div key={index}>
                  <Outputfetch Value={ticket.product_name} OutWhite />
                  <Outputfetch Value={`x${ticket.quantity}`} OutWhite />
                  <Outputfetch Value={`₱${ticket.unit_price}`} OutWhite />
                  <Outputfetch Value={`₱${ticket.total_price}`} OutWhite />
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
                Title="Payment Mode"
                Value={selectedOrder.option}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Down Payment Price"
                Name="downpayment"
                Value={"₱" + formData.downpayment}
                OnChange={handleInputChange}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Reference Number"
                Name="refNumber"
                Value={formData.refNumber}
                OnChange={handleInputChange}
                OutCol
                OutWhite
              />
              <Selectionbox
                Title="Order Status"
                Name="status"
                Value={formData.status}
                Options={["Pending", "Completed", "Cancelled"]}
                SltCol
                SltWhite
                OnChange={handleInputChange}
              />
              <Inputbox
                Type="number"
                Title="Cash"
                Name="cashPayment"
                Value={formData.cashPayment}
                OnChange={handleInputChange}
                InCol
                InWhite
              />
              <Inputbox
                Type="number"
                Title="Online"
                Name="onlinePayment"
                Value={formData.onlinePayment}
                OnChange={handleInputChange}
                InCol
                InWhite
              />
            </Group>
            <Group Class="outputfetch" Col>
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
                    OnChange={handleReceiptUpload}
                  />
                </Group>
              </Group>
            </Group>
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
