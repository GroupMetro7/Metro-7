import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title as ChartTitle, Tooltip, Legend, } from "chart.js";

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, BarElement, ChartTitle, Tooltip, Legend );

export default function BarGraph({ Data, Options }) {
  return (
    <Bar 
        data={ Data } 
        options={ Options } 
    />
  )
}