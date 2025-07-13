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
import useExportCSV from "../../hooks/Universal/fileExporter";
import DateTimeFormat from "../../hooks/Universal/DateTime_Fetch_Format";

export default function CustomerManagementPage() {
  // this file is subject for optimization
  Title("Employee Management");
  Body_addclass("Management-PAGE");

  const { exportCSV, exportedStocklogs } = useExportCSV();

  const { logs, handlePageChange, currentPage, totalPages, setSearchItem } = useStockLogs();
  //table
  const tb = {
    head: ["ITEM NAME", "SKU", "ACTION", "QUANTITY", "VALUE", "DATE", "USER", "REMARKS"],
    rows: logs.map((log) => [
      log.item_name || "N/A",
      log.sku_number,
      log.type,
      log.quantity,
      log.type === "out" ? `-₱${(log.value).toFixed(2)}` : `+₱${(log.value).toFixed(2)}`,
      DateTimeFormat(log.created_at),
      log.user_name || "N/A",
      log.remarks || "N/A"
    ])
  };

  const exportAsFile = exportedStocklogs.map((ex) => [
    ex.item_name || "N/A",
    ex.sku_number,
    ex.type,
    ex.quantity,
    ex.value,
    DateTimeFormat(ex.created_at),
    ex.user_name || "N/A",
    ex.remarks || "N/A"
  ]);

  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox Title="Search"  onChange={(e)=> setSearchItem(e.target.value)} Type="search" Placeholder="Search for type, value or sku_number"/>
            <Inputbox Title="Date" Type="date" onChange={(e)=> setSearchItem(e.target.value)}/>
          </Box>
          <Box Title="ACTIVITY LOGS" UpperRight={
              <Button Title="EXPORT AS FILE" Onclick={() => exportCSV(tb.head, exportAsFile, "activity_logs.csv")}/>
            } BoxCol>
            <Table HeadRows={tb.head} DataRows={tb.rows} />
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
