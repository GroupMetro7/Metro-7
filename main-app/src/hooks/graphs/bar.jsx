import { Bar } from 'react-chartjs-2'
import useFetch from '../fetch';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

export default function SalesReport(){
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const { monthlyRevenue, monthlyExpenses } = useFetch();
const months = Array.isArray(monthlyRevenue)
  ? monthlyRevenue.map(item => item.month_name)
  : [];

const revenues = Array.isArray(monthlyRevenue)
  ? monthlyRevenue.map(item => item.revenue)
  : [];

const expensesArr = Array.isArray(monthlyExpenses)
  ? monthlyExpenses.map(item => item.total)
  : [];

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
)
}


