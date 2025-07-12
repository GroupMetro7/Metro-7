// hooks/useModelPrediction.js
import { useMemo } from "react";

export default function useModelPrediction(FetchData) {
    const forecastdata = FetchData;

    return useMemo(() => {
        const modelforecast = Object.keys(forecastdata || {}).flatMap((itemName) =>
            (forecastdata[itemName] || []).map((entry) => ({
                item: itemName,
                date: `${(new Date(entry.ds).getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${new Date(entry.ds)
                        .getDate()
                        .toString()
                        .padStart(2, "0")}`,
                prediction: parseFloat(entry.yhat.toFixed(2)) <= 0 ? "0" : entry.yhat.toFixed(2),
            }))
        );

        const ModelTopDemand = modelforecast.reduce(
            (max, row) => (parseFloat(row.prediction) > parseFloat(max.prediction) ? row : max),
            modelforecast[0]
        );

        const labels = [...new Set(modelforecast.map((d) => d.date))].sort(
            (a, b) => new Date(a) - new Date(b)
        );

        const items = [...new Set(modelforecast.map((d) => d.item))];

        const colors = [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
            "#FF9F40", "#8B0000", "#228B22", "#2E8B57", "#FF1493",
        ];

        const datasets = items.map((itemName, index) => {
            const itemData = modelforecast.filter((d) => d.item === itemName);
            const dataPoints = labels.map((date) => {
                const match = itemData.find((d) => d.date === date);
                return match ? parseFloat(match.prediction) : null;
            });

            return {
                label: itemName,
                data: dataPoints,
                borderColor: colors[index % colors.length],
                backgroundColor: colors[index % colors.length] + "33",
                pointRadius: 4,
                tension: 0.4,
                fill: false,
            };
        });

        const ModelOptions = {
            responsive: true,
        };

        const ModelData = {
            labels,
            datasets,
        };

        return { ModelData, ModelOptions, ModelTopDemand }; }, [forecastdata]);
}
