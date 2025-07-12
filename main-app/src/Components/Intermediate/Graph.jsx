import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title as ChartTitle, Tooltip, Legend, ArcElement, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, ChartTitle, Tooltip, Legend);

export default function Graph({ BarGraph, PieGraph, LineGraph, Data, Options }) {
    return (
        <>
            { BarGraph ?
                <Bar
                    data={Data}
                    options={Options}
                />
            :
            PieGraph ?
                <Pie
                    data={Data}
                    options={Options}
                />
            :
            LineGraph ?
                <Line
                    data={Data}
                    options={Options}
                />
            :
            null }
        </>
    )
}