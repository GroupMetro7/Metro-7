import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import useFetch from '../fetch';



export default function TopCategory(){

      const {  mostSoldProduct } = useFetch();

  const topCategories = Array.isArray(mostSoldProduct)
  ? mostSoldProduct.map((item) => ({
      name: item.product_name,
      count: item.total_quantity
    }))
  : [];
    ChartJS.register(ArcElement, Tooltip, Legend);
const pieData = {
  labels: topCategories.map(cat => cat.name),
  datasets: [
    {
      data: topCategories.map(cat => cat.count),
      backgroundColor: [
        '#800000',
        '#FFCE56',
        '#FF6384',
        '#36A2EB',
        '#4BC0C0',
      ],
      borderWidth: 1,
    },
  ],
};

    const pieOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
  },
};

return (
  <Pie data={pieData} options={pieOptions} />
);
}
