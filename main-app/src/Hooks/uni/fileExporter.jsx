import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { saveAs } from "file-saver";

export default function useExportCSV() {
    const [ exportedStocklogs, setExportedStocklogs] = useState([]);
    const [ exportedInventory, setExportedInventory] = useState([]);
    const [ exportedSalesReport, setExportedSalesReport ] = useState([]);

    useEffect(() => {
  fetchExportedData();
}, []);

    const fetchExportedData = async () => {
      try {
        const response = await axiosClient.get("/export-logs");
        setExportedStocklogs(response.data.activityLogs);
        setExportedInventory(response.data.inventory);
        setExportedSalesReport(response.data.salesReports);
      } catch (error) {
        console.error("Error fetching exported data:", error);
      }
    }

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
  exportedSalesReport
}
}
