import React from 'react'
import "../../Assets/CSS/Pages/Admin/Management.sass";
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, Outputfetch, SubmitButton, Selectionbox, InsertFileButton, Pagination, KPI } from "../../Exporter/Component_Exporter";
import useFetchOrder from "../../hooks/orders/fetchOrder";
import { createWorker } from "tesseract.js";
import useModifyOrderList from "../../hooks/orders/modifyOrderList";
import useOrderHistory from "../../hooks/admin/OrderHistory/OrderHistory";
import UseKpi from "../../hooks/Universal/Kpi";
import DateTimeFormat from "../../hooks/UI Display/DateTime_Fetch_Format";
import { useStateContext, useScreenWidth, useOCRReceipt } from '../../Exporter/Hooks_Exporter'

export default function StaffOrderList() {
  Title("Order List");
  Body_addclass("Management-PAGE");

  // optimized, need to add pre orders tab
  const { selectedOrder, setSelectedOrder } = useFetchOrder();

  const { formData, setFormData, handleUpdateOrder, error, success } =
    useModifyOrderList(selectedOrder);

  const {
    orderHistory,
    currentPage,
    totalPages,
    handlePageChange,
    setSearchItem,
    setFilterDate
  } = useOrderHistory();

  const { user } = useStateContext();

  const { monthlyRevenuee, monthlyStockExpense, stockValue, totalOrders } = UseKpi()

          const handleReceiptUpload = useOCRReceipt({ setFormData })

  const tborderhistory = {
    head: [
    "ORDER NO.",
    "CUSTOMER",
    "AMOUNT",
    "DISCOUNT",
    "RECEIVED",
    "COMPLETED",
    "OPTION",
    "STATUS",
    "CASHIER"
  ],
    rows: orderHistory.map((order) => ({
      orderId: order.order_number,
      name: order.name,
      amount: order.amount,
      discount: order.discount,
      received: DateTimeFormat(order.created_at),
      completed: DateTimeFormat(order.updated_at),
      option: order.option,
      status: order.status,
      userName: `${order.user.firstname} ${order.user.lastname}`,
      edit: () => {
        setSelectedOrder(order);
      },
    }))
  }



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const kpis = [
    { Title: `TOTAL REVENUE`, Integer: `₱${Number(monthlyRevenuee || 0).toFixed(2)}/Month` },
    { Title: `STOCK EXPENSES`, Integer: `₱${Number(monthlyStockExpense || 0).toFixed(2)}/Month` },
    { Title: `STOCK VALUE`, Integer: `₱${Number(stockValue || 0).toFixed(2)}` },
    { Title: `TOTAL SOLD`, Integer: `${totalOrders}` }
  ]


  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox
              Title="Search"
              Type="search"
              OnChange={(e) => setSearchItem(e.target.value)}
              Placeholder={"Search by Order No. / user's name"}
            />
            <Inputbox
              Title="Date"
              Type="date"
              OnChange={(e) => setFilterDate(e.target.value)}
            />
          </Box>
          {user && user.role === "admin" && (
            <Group Class="upper">
              <Group Class="kpis">
                  {kpis.map((kpi, index) => (
                      <KPI key={index} Title={kpi.Title} Integer={kpi.Integer} />
                  ))}
              </Group>
            </Group>
          )}
          <Box Title="ORDER HISTORY" BoxCol>
            <Table HeadRows={tborderhistory.head} DataRows={tborderhistory.rows} EditBtn />
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
                OnChange={handleInputChange}
                SltCol
                SltWhite
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
                    OnChange={handleReceiptUpload}
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
