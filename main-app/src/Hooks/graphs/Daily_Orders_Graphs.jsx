export default function DailyOrdersGraphs(FetchData){
  const { dailyOrders } = FetchData;

  // const endDate = new Date();
  // endDate.setDate(endDate.getDate() - (weeksAgo * 7));

  // const startDate = new Date(endDate);
  // startDate.setDate(startDate.getDate() - 7);

  // const weeklyOrders = Array.isArray(dailyOrders)
  //   ? dailyOrders
  //       .filter(order => {
  //         const orderDate = new Date(order.date);
  //         return orderDate >= startDate && orderDate < endDate;
  //       })
  //       .slice(-7) // Take only last 7 entries as backup
  //   : [];

  // const getWeekLabel = (weeksAgo) => {
  //   if (weeksAgo === 0) return 'This Week';
  //   if (weeksAgo === 1) return 'Last Week';
  //   return `${weeksAgo + 1} Weeks Ago`;
  // };

  const dailyRevenueData = {
    labels: dailyOrders.map(order => order.date),
    datasets: [
      {
        label: `Daily Revenue`,
        backgroundColor: '#FF6384',
        data: dailyOrders.map(order => order.total_amount),
      },
    ],
  }

  const dailyRevenueOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  }



  const dailyOrdersData = {
    labels: dailyOrders.map(order => order.date),
    datasets: [
      {
        label: `Daily Orders`,
        backgroundColor: '#36A2EB',
        data: dailyOrders.map(order => order.total_orders),
      },
    ],
  }

  const dailyOrdersOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return { dailyOrdersData, dailyOrdersOptions, dailyRevenueData, dailyRevenueOptions }
}
