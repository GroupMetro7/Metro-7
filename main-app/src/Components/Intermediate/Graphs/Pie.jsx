import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieGraph({ Data, Options }) {
  return (
    <Pie 
        data={ Data } 
        options={ Options } 
    />
  )
}