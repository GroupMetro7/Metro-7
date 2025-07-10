import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

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
  const AttendanceChartData = {
        labels: performanceData && performanceData.daily_attendance
          ? performanceData.daily_attendance.map((day) => {
              const date = new Date(day.date);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            })
          : [],
        datasets: [
          {
            label: "Attendance Status",
            data: performanceData && performanceData.daily_attendance
              ? performanceData.daily_attendance.map((day) =>
                  day.status === "Present" ? 1 : 0
                )
              : [],
            backgroundColor: performanceData && performanceData.daily_attendance
              ? performanceData.daily_attendance.map((day) =>
                  day.status === "Present"
                    ? "rgba(34, 197, 94, 0.8)"
                    : "rgba(239, 68, 68, 0.8)"
                )
              : [],
            borderColor: performanceData && performanceData.daily_attendance
              ? performanceData.daily_attendance.map((day) =>
                  day.status === "Present" ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"
                )
              : [],
            borderWidth: 1,
          },
        ],
      }

  const AttendanceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
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


    return { AttendanceChartData, AttendanceChartOptions }
}
