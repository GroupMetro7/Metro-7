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
  const tbhead = ["ACTIVITY ID", "sku_number", "ACTION", "quantity", "value", "date"];

  const tbrows = logs.map((log) => [
    log.id,
    log.sku_number,
    log.type,
    log.quantity,
    log.type === "out" ? `-₱${log.value}` : `+₱${log.value}`,
    new Date(log.created_at).toLocaleDateString()
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
            <Inputbox Title="Search"  onChange={(e)=> setSearchItem(e.target.value)} Type="search" />
            <Inputbox Title="Date" Type="date" onChange={(e)=> setSearchItem(e.target.value)}/>
          </Box>

          <Box Title="ACTIVITY LOGS" BoxCol>
            <Button
              Title="EXPORT AS FILE"
              Onclick={() =>
                exportTableAsCSV(
                  tbhead,
                  tbrows,
                  "sales_data.csv"
                )
              }
            />
            <Table HeadRows={tbhead} DataRows={tbrows} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Main>
      </Group>
      {/* <Modal Modal="EditModal">
                <Form
                    Title="EDIT CUSTOMER"
                    FormThreelayers
                    OnSubmit={(e) =>
                        modify(
                            e,
                            currentCustomerId, // Pass the ID of the employee being edited
                            formData,
                            setFormData,
                            fetchAllUsers,
                            setSuccess,
                            setError,
                            setCurrentPage,
                            setTotalPages,
                            currentPage,
                        )
                    }
                >
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Last Name" Name="lastname" Type="text" InCol InWhite Value={formData.lastname} onChange={handleInputChange} />
                        <Inputbox Title="First Name" Name="firstname" Type="text" InCol InWhite Value={formData.firstname} onChange={handleInputChange} />
                        <Selectionbox Title="Role" Name="role" Value={formData.role} SltCol SltWhite Options={['customer', 'employee', 'admin']} option_value={formData.role} OnChange={handleInputChange} />
                        <Inputbox Title="Email" Name="email" Type="email" InCol InWhite Value={formData.email} onChange={handleInputChange} />
                        <Inputbox Title="Phone" Name="contact" Type="text" InCol InWhite Value={formData.contact} onChange={handleInputChange} />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal> */}
    </>
  );
}
