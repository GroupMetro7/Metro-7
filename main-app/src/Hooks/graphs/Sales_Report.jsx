import React from "react"
import { useMemo } from 'react';

export default function SalesReport( FetchData ) {
  const { monthlyRevenue, monthlyExpenses } = FetchData;

  const { months, revenues, expensesArr } = useMemo(() => {
    const months = Array.isArray(monthlyRevenue)
      ? monthlyRevenue.map(item => item.month_name)
      : [];
    const revenues = Array.isArray(monthlyRevenue)
      ? monthlyRevenue.map(item => item.revenue)
      : [];
    const expensesArr = Array.isArray(monthlyExpenses)
      ? monthlyExpenses.map(item => item.total)
      : [];
    return { months, revenues, expensesArr };
  }, [monthlyRevenue, monthlyExpenses]);

  const SalesReportData = {
    labels: months,
    datasets: [
      {
        label: 'Revenue',
        backgroundColor: '#36A2EB',
        data: revenues,
      },
      {
        label: 'Stock Expenses',
        backgroundColor: '#FF6384',
        data: expensesArr,
      },
    ],
  };

  const SalesReportOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return { SalesReportData, SalesReportOptions };
}