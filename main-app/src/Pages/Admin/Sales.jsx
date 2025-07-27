import React from 'react'
import "../../Assets/CSS/Pages/Admin/Sales.sass";
import {
  Title,
  Body_addclass,
  Group,
  Main,
  Box,
  Inputbox,
  Table,
  Button,
  Section,
  Selectionbox,
  DateText,
  TimeText,
  Graph,
  KPI,
  Modal,
  Form,
  SubmitButton,
  Pagination,
} from "../../Exporter/Component_Exporter";
import TopCategory from "../../Hooks/graphs/Top_Category";
import SalesReport from "../../Hooks/graphs/Sales_Report";
import useFetchData from "../../hooks/admin/fetchData";
import UseKpi from "../../hooks/Universal/Kpi";
import useExportCSV from "../../hooks/Universal/fileExporter";
import useDateFormat from "../../Hooks/UI Display/Date_Fetch_Format";

export default function SalesPage() {
  Title("Revenue");
  Body_addclass("Sales-PAGE");
  // done & for review

  const {
    exportCSV,
    exportedSalesReport,
    dateRange,
    setDateRange,
  } = useExportCSV();

  const { monthlyRevenue, productRevenue, revenuePagination, setFilterMonth } = useFetchData();
  const revpermonthhead = ["Year", "Month", "Revenue"];
  const revpermonthdata = monthlyRevenue.map((item) => [
    item.year,
    item.month_name,
    `₱${Number(item.revenue).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`,
  ]);

  const salesReport = {
    display: {
      head: ["PRODUCT NAME", "Revenue", "Month", "Total Sold"],
      rows: productRevenue.map((item) => ({
        productName: item.product_name,
        revenue: item.total_product_sales,
        month: item.month,
        totalSold: item.total_quantity_sold,
      })),
    },
    export: {
      head: [
        "Order Number",
        "Product Name",
        "Price",
        "Quantity",
        "Cost Per Unit",
        "Date",
      ],
      rows: exportedSalesReport.map((item) => [
        item.order.order_number,
        item.product_name,
        item.unit_price,
        item.quantity,
        item.cost || "N/A",
        useDateFormat(item.created_at),
      ]),
    },
  };

    const monthOptions = [
    { value: "", label: "Current" },
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  return (
    <>
      <Group>
        <Main Row>
          <Box Class="search">
            <Selectionbox Title="Period" Options={monthOptions} OnChange={(e) => setFilterMonth(e.target.value)} />
            <Inputbox Title="Date" Type="date" />
          </Box>
          <Section
            Title="Sales Revenue"
            Class="salesrevenue"
            UpperRight={
              <Button Title="EXPORT AS FILE" OpenModal="AddModal-exportCSV" />
            }
          >
            <Box Title="BREAKDOWN REVENUE PER MONTH" BoxCol>
              <Table HeadRows={revpermonthhead} DataRows={revpermonthdata} />
            </Box>
            <Box Title="PRODUCT REVENUE PER MONTH" BoxCol>
              <Table
                HeadRows={salesReport.display.head}
                DataRows={salesReport.display.rows}
              />
            <Pagination currentPage={revenuePagination.currentPage} totalPages={revenuePagination.totalPages} onPageChange={revenuePagination.handlePageChange} />
            </Box>
          </Section>
        </Main>
      </Group>
      <Modal Modal="AddModal-exportCSV">
        <Form Title="EXPORT FILE" FormTwolayers>
          <Group Class="inputside" Wrap>
            <Inputbox
              Title="Start Date"
              Type="date"
              Value={dateRange.startDate}
              OnChange={(e) =>
                setDateRange((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              InCol
              InWhite
            />
            <Inputbox
              Title="End Date"
              Type="date"
              Value={dateRange.endDate}
              OnChange={(e) =>
                setDateRange((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
              InCol
              InWhite
            />
          </Group>
          <Group Class="buttonside">
            <SubmitButton
              Title="SUBMIT"
              BtnWhite
              Onclick={(e) => {
                e.preventDefault();
                exportCSV(
                  salesReport.export.head,
                  salesReport.export.rows,
                  `Sales_Report_${dateRange.startDate || "start"}_to_${dateRange.endDate || "end"}.csv`
                );
              }}
            />
            <Button Title="CANCEL" CloseModal BtnWhite />
          </Group>
        </Form>
      </Modal>
    </>
  );
}
