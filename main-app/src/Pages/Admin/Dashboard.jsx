import React from 'react'
import '../../Assets/CSS/Pages/Admin/Dashboard.sass'
import { Main, Group, Section, Box, Table, Modal, Form, Outputfetch, Button, SubmitButton, Pagination, Selectionbox, InsertFileButton, Inputbox, Graph, KPI } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useClockText, useDateFormat, useTimeFormat, useOCRReceipt, TopCategory, SalesReport, useFetchOrders, UseKpi, useModifyOrderList, useFetchDashboardData, DailyOrdersGraphs } from '../../Exporter/Hooks_Exporter'

export default function DashboardPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle("Metro 7 | Admin Dashboard")
    useBodyAddClass("Dashboard-Admin-PAGE")

  // optimized
  // needs some updates
  const {
    orders,
    selectedOrder,
    setSelectedOrder,
    currentPage,
    totalPages,
    handlePageChange,
    fetchOrder
  } = useFetchOrders();

  const { monthlyRevenuee, monthlyStockExpense, stockValue, totalOrders, dailyOrders } = UseKpi()

  const { formData, setFormData, handleUpdateOrder, error, success } =
    useModifyOrderList(selectedOrder, fetchOrder);

    const handleReceiptUpload = useOCRReceipt({ setFormData })
  const tbhead = [
    "NO.",
    "CUSTOMER",
    "AMOUNT",
    "BALANCE",
    "DISCOUNT",
    "RECEIVED",
    "COMPLETED",
    "STATUS",
    "OPTION",
    "DATE"
  ];
  const tbrows = orders.map((order) => ({
    order_number: order.order_number,
    order_date: order.name,
    amount: "₱" + order.amount,
    balance: "₱" + order.unpaid_balance,
    discount: "₱" + order.discount,
    received: new Date(order.created_at).toLocaleTimeString([], { timeStyle: "short" }),
    completed: new Date(order.updated_at).toLocaleTimeString([], { timeStyle: "short" }),
    status: order.status,
    option: order.option,
    date: new Date(order.created_at).toLocaleDateString(),
    edit: () => {
      setSelectedOrder(order);
    },
  }));

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

  const { SalesReportData, SalesReportOptions } = SalesReport(useFetchDashboardData());
  const { TopCategoryData, TopCategoryOptions } = TopCategory(useFetchDashboardData());
  const { dailyOrdersData, dailyOrdersOptions, dailyRevenueData, dailyRevenueOptions } = DailyOrdersGraphs(useFetchDashboardData());


    const {time, date} = useClockText()

  return (
    <>
      <Group>
        <Main>
          <Section Title="Sales Revenue" Class="salesrevenue">
            <Group Class="upper">
              <Group Class="kpis">
                {kpis.map((kpi, index) => (
                  <KPI key={index} Title={kpi.Title} Integer={kpi.Integer} />
                ))}
              </Group>
              <Box Class="datetime">
                <h3>
                {date}
                <br />
                {time}
              </h3>
              </Box>
            </Group>
            <Group Class="charts">
              <Box Title="Sales Status" Class="salesstatus" BoxCol>
                <Graph BarGraph Data={ SalesReportData } Options={ SalesReportOptions } />
              </Box>
              <Box Title="Most Sold Products" Class="topcategory" BoxCol>
                <Graph PieGraph Data={ TopCategoryData } Options={ TopCategoryOptions } />
              </Box>
            </Group>
            <Group Class="charts">
              <Box Title="Daily Revenue" Class="salesstatus" BoxCol>
                <Graph BarGraph Data={ dailyRevenueData } Options={ dailyRevenueOptions } />
              </Box>
              <Box Title="Daily Order" Class="salesstatus" BoxCol>
                <Graph BarGraph Data={ dailyOrdersData } Options={ dailyOrdersOptions } />
              </Box>
            </Group>
          </Section>
          <Box Title="RECENT ORDER" BoxCol>
            <Table HeadRows={tbhead} DataRows={tbrows} EditBtn />
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
              {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
              success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="No."
                Value={selectedOrder.order_number}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Date"
                Value={`${useDateFormat(new Date())} | ${useTimeFormat(new Date())}`}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Name"
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
                Title="Status"
                Name="status"
                Value={formData.status}
                Options={["Pending", "Completed", "Cancelled"]}
                OnChange={handleInputChange}
                SltCol
                SltWhite
              />
                            <Inputbox
                Title="Cash"
                Type="number"
                Name="cashPayment"
                Value={formData.cashPayment}
                OnChange={handleInputChange}
                InCol
                InWhite
              />
              <Inputbox
                Title="Online"
                Type="number"
                Name="onlinePayment"
                Value={formData.onlinePayment}
                OnChange={handleInputChange}
                InCol
                InWhite
              />
            </Group>
            <Group ID={`ocr`} Class="outputfetch ocr" Col>
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
                    Accept="image/*"
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
