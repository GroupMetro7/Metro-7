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

export default function AttendanceChart() {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      const response = await axiosClient.get("/weekly-orders");
      setPerformanceData(response.data);
    } catch (error) {
      console.error("Error fetching performance data:", error);
    }
  };

  // Prepare attendance chart data
  const attendanceChartData = performanceData
    ? {
        labels: performanceData.daily_attendance.map((day) => {
          const date = new Date(day.date);
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }),
        datasets: [
          {
            label: "Attendance Status",
            data: performanceData.daily_attendance.map((day) =>
              day.status === "Present" ? 1 : 0
            ),
            backgroundColor: performanceData.daily_attendance.map((day) =>
              day.status === "Present"
                ? "rgba(34, 197, 94, 0.8)"
                : "rgba(239, 68, 68, 0.8)"
            ),
            borderColor: performanceData.daily_attendance.map((day) =>
              day.status === "Present" ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
            ),
            borderWidth: 1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
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

  const attendanceOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: "Daily Attendance (Last 7 Days)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return value === 1 ? "Present" : "Absent";
          },
        },
      },
    },
  };

  return (
    <>
      {performanceData ? (
        <div>
          {/* Attendance Chart */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ height: "250px" }}>
              <Bar data={attendanceChartData} options={attendanceOptions} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading performance data...</p>
      )}
    </>
  );
}
