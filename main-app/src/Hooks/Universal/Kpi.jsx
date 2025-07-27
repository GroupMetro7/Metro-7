import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function UseKpi() {
  const [monthlyRevenuee, setMonthlyRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [stockValue, setStockValue] = useState(0);
  const [monthlyStockExpense, setMonthlyStockExpense] = useState(0);

  // inventory KPI
  const [ UnavailableItems, setUnavailableItems ] = useState(0);
  const [ LowStockItems, setLowStockItems ] = useState(0);
  const [ AvailableItems, setAvailableItems ] = useState(0);

  useEffect(() => {
    axiosClient.get("/completed-order").then(({ data }) => {
      setMonthlyRevenue(data.actualSales);
      setTotalOrders(data.totalCompletedOrders);
      setStockValue(data.totalStockValue);
      setMonthlyStockExpense(data.totalExpense);
    });
  }, []);

  useEffect(() => {
    getInventoryKPI();
  }, []);

const getInventoryKPI = async () => {
  try {
    const { data } = await axiosClient.get("/inventory-kpi");
    setUnavailableItems(data.totalUnavailableItems);
    setLowStockItems(data.totalLowStockItems);
    setAvailableItems(data.totalAvailableItems);
  } catch (error) {
    console.error("Error fetching inventory KPI:", error);
  }
}


  return { monthlyRevenuee, monthlyStockExpense, stockValue, totalOrders, UnavailableItems, LowStockItems, AvailableItems, getInventoryKPI };

}
