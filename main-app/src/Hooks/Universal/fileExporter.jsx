import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { saveAs } from "file-saver";

export default function useExportCSV() {
    const [exportedStocklogs, setExportedStocklogs] = useState([]);
    const [exportedInventory, setExportedInventory] = useState([]);
    const [exportedSalesReport, setExportedSalesReport] = useState([]);
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });

    useEffect(() => {
        fetchExportedData(dateRange.startDate, dateRange.endDate);
    }, [dateRange]);

    const fetchExportedData = async (startDate, endDate) => {
        try {
            const params = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;

            const response = await axiosClient.get("/export-logs", { params });
            setExportedStocklogs(response.data.activityLogs);
            setExportedInventory(response.data.inventory);
            setExportedSalesReport(response.data.salesReports);
        } catch (error) {
            console.error("Error fetching exported data:", error);
        }
    };

    const setExportDateRange = (startDate, endDate) => {
        setDateRange({ startDate, endDate });
    };

    const exportCSV = (headers, data, filename = "table_data.csv") => {
        const csvRows = [];
        csvRows.push(headers.join(",")); // header row

        data.forEach((row) => {
            const escaped = row.map(cell =>
                `"${String(cell).replace(/"/g, '""')}"`
            );
            csvRows.push(escaped.join(","));
        });

        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, filename);
    };

    return {
        exportCSV,
        exportedStocklogs,
        exportedInventory,
        exportedSalesReport,
        setExportDateRange,
        dateRange,
        setDateRange
    }
}
