import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function ServiceBarChart() {
    const [weeklyOrders, setWeeklyOrders] = useState(null);

    useEffect(() => {
        fetchWeeklyOrders();
    }, []);

    const fetchWeeklyOrders = async () => {
        try {
            const response = await axiosClient.get("/weekly-orders");
            setWeeklyOrders(response.data);
        } 
        catch (error) {
            console.error("Error fetching weekly orders:", error);
        }
    };


    const ServiceSalesReportData = {
        labels: weeklyOrders?.daily_stats?.map((day) => {
            const date = new Date(day.date);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
        }) || [],
        datasets: [
            {
                label: "Daily Orders",
                data: weeklyOrders?.daily_stats?.map((day) => day.order_count) || [],
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.63)",
                tension: 0.1,
            },
        ],
    };

    const ServiceSalesReportOptions = {
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

    return { ServiceSalesReportData, ServiceSalesReportOptions }
}
