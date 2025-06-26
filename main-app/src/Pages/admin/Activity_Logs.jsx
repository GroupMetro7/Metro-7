import "../../assets/css/pages/admin/Management.sass";
import {
  Title,
  Body_addclass,
  Group,
  Main,
  Box,
  Inputbox,
  Table,
  Button,
  Pagination,
} from "../../exporter/component_exporter";
import useStockLogs from "../../hooks/admin/activity_logs/activityLogs";

export default function CustomerManagementPage() {
  // this file is subject for optimization
  Title("Employee Management");
  Body_addclass("Management-PAGE");

  const { logs, handlePageChange, currentPage, totalPages, setSearchItem } = useStockLogs();
  //table
  const tbhead = ["ITEM NAME", "sku_number", "ACTION", "quantity", "value", "date", "user's name"];
    const tbrows = logs.map((log) => [
    log.item_name || "N/A",
    log.sku_number,
    log.type,
    log.quantity,
    log.type === "out" ? `-₱${(log.value).toFixed(2)}` : `+₱${(log.value).toFixed(2)}`,
    new Date(log.created_at).toLocaleDateString(),
    log.user_name || "N/A",
  ]);

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

  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox Title="Search"  onChange={(e)=> setSearchItem(e.target.value)} Type="search" Placeholder="Search for type, value or sku_number"/>
            <Inputbox Title="Date" Type="date" onChange={(e)=> setSearchItem(e.target.value)}/>
          </Box>
          <Box Title="ACTIVITY LOGS" UpperRight={
              <Button Title="EXPORT AS FILE" Onclick={() => exportTableAsCSV( tbhead, tbrows, "sales_data.csv" )}/>
            } BoxCol>
            <Table HeadRows={tbhead} DataRows={tbrows} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Main>
      </Group>
    </>
  );
}
