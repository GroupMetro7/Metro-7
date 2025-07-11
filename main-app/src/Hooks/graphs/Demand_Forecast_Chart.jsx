import React, { useEffect, useState } from "react";
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import useFetchModelPrediction from "../../Hooks/AI/Fetch_Model_Prediction";

// Register required Chart.js components
ChartJS.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

export default function MixedChart() {
    const forecastdata = useFetchModelPrediction()

    const tbrowsOrders = Object.keys(forecastdata || {}).flatMap((itemName) =>
        (forecastdata[itemName] || []).map((entry) => ({
            item: itemName,
            date: `${(new Date(entry.ds).getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${new Date(entry.ds)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`,
            prediction: entry.yhat.toFixed(2) <= 0 ? "0" : entry.yhat.toFixed(2),
        }))
    );

    const maxPredictionRow = tbrowsOrders.reduce((max, row) =>
        parseFloat(row.prediction) > parseFloat(max.prediction) ? row : max
        , tbrowsOrders[0]);

    // if (tbrowsOrders.length === 0) return <p>Loading chart...</p>;

    // Get sorted unique date labels
    const labels = [...new Set(tbrowsOrders.map((d) => d.date))].sort(
        (a, b) => new Date(a) - new Date(b)
    );

    // Get unique item names
    const items = [...new Set(tbrowsOrders.map((d) => d.item))];

    // Assign each item a different color
    const colors = [
        "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
        "#FF9F40", "#8B0000", "#228B22", "#2E8B57", "#FF1493"
    ];

    // Create datasets for line chart
    const grouped = items.map((itemName, index) => {
        const itemData = tbrowsOrders.filter((d) => d.item === itemName);
        const dataPoints = labels.map((date) => {
            const match = itemData.find((d) => d.date === date);
            return match ? match.prediction : null;
        });

        return {
            label: itemName,
            data: dataPoints,
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length] + "33", // transparent fill
            pointRadius: 4,
            tension: 0.4,
            fill: false,
        };
    });

    // Chart config
    const options = {
        responsive: true,
        scales: {
            x: {
                type: "category",
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Prediction",
                },
                beginAtZero: true,
                suggestedMin: 0,
            },
        },
    };

    return (
        <>
            <Chart
                key={JSON.stringify(grouped)}
                type="line"
                data={{
                    labels,
                    datasets: grouped,
                }}
                options={options}
            />
            {/* {  maxPredictionRow && } */}
            {maxPredictionRow && <>
                <h3>Based on the demand forecast, {maxPredictionRow.item} sales are expected to increase
                    over the next four weeks. To meet this rising demand, the business should restock more
                    {maxPredictionRow.item} by the end of this week. This proactive step will help prevent
                    stockouts, maintain customer satisfaction, and keep daily operations running smoothly.</h3>
                {/* <h3>{ maxPredictionRow.prediction }</h3> */}
            </>
            }
        </>
    );
}
