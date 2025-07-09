import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarGraph({ Data, Options }) {
  return (
    <Bar 
        data={ Data } 
        options={ Options } 
    />
  )
}