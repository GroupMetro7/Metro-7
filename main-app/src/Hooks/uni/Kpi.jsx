import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import {KPI}  from "../../exporter/component_exporter";

export default function UseKpi() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [stockValue, setStockValue] = useState(0);
  const [monthlyStockExpense, setMonthlyStockExpense] = useState(0);

  useEffect(() => {
    axiosClient.get("/completed-order").then(({ data }) => {
      setMonthlyRevenue(data.actualSales);
      setTotalOrders(data.totalCompletedOrders);
      setStockValue(data.totalStockValue);
      setMonthlyStockExpense(data.totalExpense);
    });
  }, []);

  return (
    <>
      <KPI Title="TOTAL REVENUE" Integer={'₱' + monthlyRevenue + ' ' + '/Month'} />
      <KPI Title="STOCK EXPENSES" Integer={'₱' + monthlyStockExpense.toFixed(2) + ' ' + '/Month'} />
      <KPI Title="STOCK VALUE" Integer={'₱' + stockValue.toFixed(2) } />
      <KPI Title="TOTAL SOLD" Integer={totalOrders} />
    </>
  );
}
