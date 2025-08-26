import React from 'react'
import '../../Assets/CSS/Pages/Admin/Management.sass'
import { Main, Group, Box, Inputbox, Table, Button, Pagination, Modal, Form, SubmitButton } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useExportCSV, useDateTimeFormat, useStockLogs } from '../../Exporter/Hooks_Exporter'

export default function ActivityLogsPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Logs`)
    useBodyAddClass(`Management-PAGE`)

    const screenwidth = useScreenWidth()

    const { exportCSV, exportedStocklogs, dateRange, setDateRange } = useExportCSV()

    const { logs, handlePageChange, currentPage, totalPages, setSearchItem } = useStockLogs()

    const handleExportActivityLogs = (e) => {
        e.preventDefault()
        exportCSV(
            activityLogsReport.export.head,
            activityLogsReport.export.rows,
            `Activity_Logs_${dateRange.startDate || "start"}_to_${dateRange.endDate || "end"}.csv`
        )
    }

    const activityLogsReport = {
        display: {
            head: ["ITEM NAME", "SKU", "ACTION", "QUANTITY", "VALUE", "DATE", "USER", "REMARKS"],
            rows: logs.map((log) => [
                log.item_name || "N/A",
                log.sku_number,
                log.type,
                log.quantity,
                log.type === "out" ? `-₱${(log.value).toFixed(2)}` : `+₱${(log.value).toFixed(2)}`,
                useDateTimeFormat(log.created_at),
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
                useDateTimeFormat(ex.created_at),
                ex.user_name || "N/A",
                ex.remarks || "N/A"
            ])
        }
    }


    return (
        <>
            <Main>
                <Box Class="search">
                    <Inputbox Title="Search" OnChange={(e) => setSearchItem(e.target.value)} Type="search" Placeholder="Search for type, value or sku_number" />
                    <Inputbox Title="Date" Type="date" OnChange={(e) => setSearchItem(e.target.value)} />
                </Box>
                <Box Title="ACTIVITY LOGS" UpperRight={
                    <Button Title="EXPORT AS FILE" OpenModal="AddModal-exportCSV" />
                } BoxCol>
                    <Table HeadRows={activityLogsReport.display.head} DataRows={activityLogsReport.display.rows} />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Box>
            </Main>

            <Modal Modal="AddModal-exportCSV">
                <Form Title="EXPORT FILE" {...(screenwidth > 1023 ? { FormThreelayers: true } : screenwidth > 766 ? { FormTwolayers: true } : { Col: true })}>
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
                    {screenwidth > 766 ?
                        <Group Class={`buttonside`}>
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                            <SubmitButton Title="SUBMIT" BtnWhite Onclick={handleExportActivityLogs} />
                        </Group>
                        :
                        <Group Class={`buttonside`} Col>
                            <SubmitButton Title="SUBMIT" BtnWhite Onclick={handleExportActivityLogs} />
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                        </Group>
                    }
                </Form>
            </Modal>
        </>
    )
}
