import React from "react";
import "../../assets/css/pages/admin/Sales.sass";
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
  KPI
} from "../../exporter/component_exporter";
import TopCategory from "../../Hooks/graphs/Top_Category";
import SalesReport from "../../Hooks/graphs/Sales_Report";
import useFetchData from "../../hooks/admin/fetchData";
import UseKpi from "../../hooks/Universal/Kpi";
import useExportCSV from "../../hooks/Universal/fileExporter";

export default function SalesPage() {
  Title("Revenue");
  Body_addclass("Sales-PAGE");
  // done & for review
  const { exportCSV, exportedSalesReport } = useExportCSV();
  const { monthlyRevenue, productRevenue } = useFetchData();
  const revpermonthhead = ["Year", "Month", "Revenue"];
  const revpermonthdata = monthlyRevenue.map((item) => [
    item.year,
    item.month_name,
    `₱${Number(item.revenue).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`,
  ]);
  const { monthlyRevenuee, monthlyStockExpense, stockValue, totalOrders } = UseKpi()

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
      head: ["Order Number", "Product Name", "Price", "Quantity", "Cost Per Unit"],
      rows: exportedSalesReport.map((item) => ([
        item.order.order_number,
        item.product_name,
        item.unit_price,
        item.quantity,
        item.cost || "N/A"
      ]
      ))
    }
  };

  const { SalesReportData, SalesReportOptions } = SalesReport(useFetchData());
  const { TopCategoryData, TopCategoryOptions } = TopCategory(useFetchData());

  const kpis = [
    { Title: `TOTAL REVENUE`, Integer: `₱${Number(monthlyRevenuee || 0).toFixed(2)}/Month` },
    { Title: `STOCK EXPENSES`, Integer: `₱${Number(monthlyStockExpense || 0).toFixed(2)}/Month` },
    { Title: `STOCK VALUE`, Integer: `₱${Number(stockValue || 0).toFixed(2)}` },
    { Title: `TOTAL SOLD`, Integer: `${totalOrders}` }
  ]

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
            UpperRight={<Button Title="EXPORT AS FILE" Onclick={() => exportCSV(salesReport.export.head, salesReport.export.rows, "Sales_Report.csv")}/>}
          >
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
            <Box Title="BREAKDOWN REVENUE PER MONTH" BoxCol>
              <Table HeadRows={revpermonthhead} DataRows={revpermonthdata} />
            </Box>
            <Box Title="PRODUCT REVENUE PER MONTH" BoxCol>
              <Table HeadRows={salesReport.display.head} DataRows={salesReport.display.rows} />
            </Box>
          </Section>
        </Main>
      </Group>
    </>
  );
}