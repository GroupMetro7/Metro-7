import React from "react"

export default function TopCategory( FetchData ) {
  const { mostSoldProduct } = FetchData;

  // Memoize data processing for performance
  const topCategories = Array.isArray(mostSoldProduct)
    ? mostSoldProduct.map(item => ({
        name: item.product_name,
        count: item.total_quantity
      }))
    : [];

  const TopCategoryData = {
    labels: topCategories.map(cat => cat.name),
    datasets: [
      {
        data: topCategories.map(cat => cat.count),
        backgroundColor: [
          '#800000',
          '#FFCE56',
          '#FF6384',
          '#36A2EB',
          '#4BC0C0',
        ],
        borderWidth: 1,
      },
    ],
  };

  const TopCategoryOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return { TopCategoryData, TopCategoryOptions };
}
