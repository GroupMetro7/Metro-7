import React, { useState } from "react";
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

  const { monthlyRevenue, productRevenue } = useFetchData();
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


  return (
    <>
      <Group>
        <Main Row>
          <Box Class="search">
            <Selectionbox Title="Period" />
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
