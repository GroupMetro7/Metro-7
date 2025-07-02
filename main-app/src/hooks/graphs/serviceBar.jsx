import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axiosClient from "../../axiosClient";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);


export default function ServiceBarChart() {
    const [weeklyOrders, setWeeklyOrders] = useState(null);

  useEffect(() => {
    fetchWeeklyOrders();
  }, []);

  const fetchWeeklyOrders = async () => {
    try {
      const response = await axiosClient.get("/weekly-orders");
      setWeeklyOrders(response.data);
    } catch (error) {
      console.error("Error fetching weekly orders:", error);
    }
  };


    const chartData = weeklyOrders
    ? {
        labels: weeklyOrders.daily_stats.map((day) => {
          const date = new Date(day.date);
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }),
        datasets: [
          {
            label: "Daily Orders",
            data: weeklyOrders.daily_stats.map((day) => day.order_count),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.63)",
            tension: 0.1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Daily Order Statistics (Last 7 Days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <>
    {weeklyOrders ? (
                    <div>
                      <div style={{ height: "300px" }}>
                        <Bar
                          data={chartData}
                          options={{
                            ...chartOptions,
                            plugins: {
                              ...chartOptions.plugins,
                            },
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p>Loading statistics...</p>
                  )}
    </>
  );
}
