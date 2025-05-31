import { Bar } from 'react-chartjs-2'
import { useMemo } from 'react';
import useFetch from '../fetch';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import useFetchDashboardData from '../admin/fetchData';

// Register ChartJS modules ONCE outside the component
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SalesReport() {
  const { monthlyRevenue, monthlyExpenses } = useFetchDashboardData();

  // Memoize data processing for performance
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

  const barData = {
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

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <Bar data={barData} options={barOptions} />
  );
}
