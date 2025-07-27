import React from 'react'
import '../../Assets/CSS/Pages/Admin/Management.sass'
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Pagination, Modal, Form, SubmitButton } from "../../Exporter/Component_Exporter";
import useStockLogs from "../../hooks/admin/activity_logs/activityLogs";
import useExportCSV from "../../hooks/Universal/fileExporter";
import DateTimeFormat from "../../hooks/UI Display/DateTime_Fetch_Format";

export default function CustomerManagementPage() {
  // this file is subject for optimization
  Title("Employee Management");
  Body_addclass("Management-PAGE");

  const { exportCSV, exportedStocklogs, dateRange, setDateRange } = useExportCSV();

  const { logs, handlePageChange, currentPage, totalPages, setSearchItem } = useStockLogs();
  //table
  // const tb = {
  //   head: ["ITEM NAME", "SKU", "ACTION", "QUANTITY", "VALUE", "DATE", "USER", "REMARKS"],
  //   rows: logs.map((log) => [
  //     log.item_name || "N/A",
  //     log.sku_number,
  //     log.type,
  //     log.quantity,
  //     log.type === "out" ? `-₱${(log.value).toFixed(2)}` : `+₱${(log.value).toFixed(2)}`,
  //     DateTimeFormat(log.created_at),
  //     log.user_name || "N/A",
  //     log.remarks || "N/A"
  //   ])
  // };

  // const exportAsFile = exportedStocklogs.map((ex) => [
  //   ex.item_name || "N/A",
  //   ex.sku_number,
  //   ex.type,
  //   ex.quantity,
  //   ex.value,
  //   DateTimeFormat(ex.created_at),
  //   ex.user_name || "N/A",
  //   ex.remarks || "N/A"
  // ]);

  const activityLogsReport = {
display: {
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
},
export: {
    head: ["ITEM NAME", "SKU", "ACTION", "QUANTITY", "VALUE", "DATE", "USER", "REMARKS"],
    rows: exportedStocklogs.map((ex) => [
      ex.item_name || "N/A",
      ex.sku_number,
      ex.type,
      ex.quantity,
      ex.value,
      DateTimeFormat(ex.created_at),
      ex.user_name || "N/A",
      ex.remarks || "N/A"
    ])
  }
}


  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox Title="Search" OnChange={(e)=> setSearchItem(e.target.value)} Type="search" Placeholder="Search for type, value or sku_number"/>
            <Inputbox Title="Date" Type="date" OnChange={(e)=> setSearchItem(e.target.value)}/>
          </Box>
          <Box Title="ACTIVITY LOGS" UpperRight={
              <Button Title="EXPORT AS FILE" OpenModal="AddModal-exportCSV"/>
            } BoxCol>
            <Table HeadRows={activityLogsReport.display.head} DataRows={activityLogsReport.display.rows} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
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
                        activityLogsReport.export.head,
                        activityLogsReport.export.rows,
                        `Activity_Logs_${dateRange.startDate || "start"}_to_${dateRange.endDate || "end"}.csv`
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
