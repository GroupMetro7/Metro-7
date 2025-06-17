import React, { useEffect, useState } from "react";
import "../../assets/css/pages/services/Management.sass";
import {
  Title,
  Body_addclass,
  SideBar,
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
} from "../../exporter/component_exporter";
import useSearchItem from "../../hooks/searchItem";
import useFetchOrder from "../../hooks/orders/fetchOrder";
import { createWorker } from "tesseract.js";
import useModifyOrderList from "../../hooks/orders/modifyOrderList";

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
    fetchOrder
  } = useFetchOrder();

  const { formData, setFormData, handleUpdateOrder, error, success } =
    useModifyOrderList(selectedOrder, fetchOrder);

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

  // const handlePageChange = (page) => {
  //     setCurrentPage(page);
  // };

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
              Title="Search"
              onChange={(e) => setSearchItem(e.target.value)}
              Type="search"
              Placeholder="Search Order number"
            />
            <Inputbox
              Title="Filter"
              Type="text"
              Placeholder="Search by status"
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

      <Modal Modal="EditModal" onClose={() => setSelectedOrder(null)}>
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
                onChange={handleInputChange}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Reference Number"
                Name="refNumber"
                Value={formData.refNumber}
                onChange={handleInputChange}
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
            </Group>
            <Group Class="inputside">
              <Inputbox
                Title="Cash"
                Type="text"
                Name="cashPayment"
                Value={formData.cashPayment}
                onChange={handleInputChange}
                InCol
                InWhite
              />
              <Inputbox
                Title="Online"
                Name="onlinePayment"
                Value={formData.onlinePayment}
                onChange={handleInputChange}
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
                    Title="ADD OCR PICTURE"
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
setFormData((prev) => ({
  ...prev,
  refNumber: referenceNumber,
  downpayment: parsedAmount,
}));
                      }
                    }}
                  />
                </Group>
              </Group>
            </Group>
            <Group Class="buttonside">
              <Button Title="CLOSE" CloseModal BtnWhite />
              <SubmitButton Title="SAVE" BtnWhite />
            </Group>
          </Form>
        )}
      </Modal>
    </>
  );
}
