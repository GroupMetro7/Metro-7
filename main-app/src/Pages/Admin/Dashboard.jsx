import "../../assets/css/pages/admin/Dashboard.sass";
import {
  Title,
  Body_addclass,
  Group,
  Main,
  Section,
  Box,
  DateText,
  TimeText,
  Table,
  Modal,
  Form,
  Outputfetch,
  Button,
  SubmitButton,
  Pagination,
  Selectionbox,
  InsertFileButton,
  Inputbox,
  Graph,
  KPI
} from "../../exporter/component_exporter";
import TopCategory from "../../Hooks/graphs/Top_Category";
import SalesReport from "../../Hooks/graphs/Sales_Report";
import ModelPrediction from "../../Hooks/AI/Fetch_Model_Prediction";
import DemandForecast from "../../Hooks/graphs/Demand_Forecast_Chart";
import UseKpi from "../../hooks/uni/Kpi";
import useFetchOrder from "../../hooks/orders/fetchOrder";
import useModifyOrderList from "../../hooks/orders/modifyOrderList";
import useFetchDashboardData from '../../hooks/admin/fetchData';
import useFetchModelPrediction from "../../Hooks/AI/Fetch_Model_Prediction";
import { createWorker } from "tesseract.js";

export default function DashboardPage() {
  Title("Dashboard");
  Body_addclass("Dashboard-Admin-PAGE");
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
  } = useFetchOrder();

  const { monthlyRevenuee, monthlyStockExpense, stockValue, totalOrders } = UseKpi()

  const { formData, setFormData, handleUpdateOrder, error, success } =
    useModifyOrderList(selectedOrder, fetchOrder);

  const tbhead = [
    "ORDER NO.",
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
  const { ModelData, ModelOptions, ModelTopDemand } = DemandForecast(useFetchModelPrediction());

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
                  <DateText />
                  <br />
                  <TimeText />
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
              <Box Title="Demand Forecast" Class="demandforecast" BoxCol>
                <Graph LineGraph Data={ ModelData } Options={ ModelOptions } />
                {ModelTopDemand && (
                 <Group>
                     <h3>
                         Based on the demand forecast, {ModelTopDemand.item} sales are expected to increase over 
                         the next four weeks. To meet this rising demand, the business should restock more {ModelTopDemand.item} by 
                         the end of this week. This proactive step will help prevent stockouts, maintain customer satisfaction, 
                         and keep daily operations running smoothly.
                     </h3>
                 </Group>
             )}
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
      <Modal Modal="ViewModal">
        <Form Title="VIEW ORDER" FormThreelayers>
          <Group Class="outputfetch" Wrap>
            <Outputfetch Title="Order No." Value="25569" OutCol OutWhite />
            <Outputfetch
              Title="Order Date"
              Value="2025-02-24 | 02:27:25"
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Cashier Name"
              Value="Micheal Lance Kester Li"
              OutCol
              OutWhite
            />
            <Outputfetch Title="Options" Value="TAKE-OUT" OutCol OutWhite />
            <Outputfetch Title="Amount" Value="₱559.00" OutCol OutWhite />
          </Group>
          <Group Class="buttonside">
            <Button Title="CLOSE" CloseModal BtnWhite />
          </Group>
        </Form>
      </Modal>
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
                OnChange={handleInputChange}
                SltCol
                SltWhite
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
