import React from "react"
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
  BarGraph,
  PieGraph
} from "../../exporter/component_exporter";
import { saveAs } from "file-saver";
import TopCategory from "../../Hooks/graphs/Top_Category";
import SalesReport from "../../Hooks/graphs/Sales_Report";
import useFetchData from "../../hooks/admin/fetchData";
import UseKpi from "../../hooks/uni/Kpi";

export default function SalesPage() {
  Title("Revenue");
  Body_addclass("Sales-PAGE");
  // done & for review
  const { monthlyRevenue, productRevenue } = useFetchData();
  const revpermonthhead = ["Year", "Month", "Revenue"];
  const revpermonthdata = monthlyRevenue.map((item) => [
    item.year,
    item.month_name,
    `₱${Number(item.revenue).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })}`,
  ]);

  const prodrev = [
    "Product Name",
    "Revenue",
    "Month",
    "TOTAL SOLD"
  ];
  const prodrevData = productRevenue.map((item) => ({
    productName: item.product_name,
    revenue: item.total_product_sales,
    month: item.month,
    totalSold: item.total_quantity_sold
  }));

  const exportTableAsCSV = (headers, data, filename = "table_data.csv") => {
    const csvRows = [];
    csvRows.push(headers.join(","));
    data.forEach((row) => {
      csvRows.push(row.join(","));
    });
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    saveAs(blob, filename);
  };

  const { SalesReportData, SalesReportOptions } = SalesReport( useFetchData());
    const { TopCategoryData, TopCategoryOptions } = TopCategory(useFetchData());

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
              <Button
                Title="EXPORT AS FILE"
                Onclick={() =>
                  exportTableAsCSV(
                    revpermonthhead,
                    revpermonthdata,
                    "sales_data.csv"
                  )
                }
              />
            }
          >
            <Group Class="upper">
              <Group Class="kpis">
                <UseKpi />
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
                <BarGraph Data={ SalesReportData } Options={ SalesReportOptions } />
              </Box>
              <Box Title="Most Sold Products" Class="topcategory" BoxCol>
                <PieGraph Data={ TopCategoryData } Options={ TopCategoryOptions } />
              </Box>
            </Group>
            <Box Title="BREAKDOWN REVENUE PER MONTH" BoxCol>
              <Table HeadRows={revpermonthhead} DataRows={revpermonthdata} />
            </Box>
            <Box Title="PRODUCT REVENUE PER MONTH" BoxCol>
              <Table HeadRows={prodrev} DataRows={prodrevData} />
            </Box>
          </Section>
        </Main>
      </Group>
    </>
  );
}
