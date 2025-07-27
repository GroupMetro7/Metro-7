import React, { useEffect, useState } from "react";
import "../../Assets/CSS/Pages/Admin/Management.sass"
import {
  Title,
  Body_addclass,
  Group,
  Main,
  Box,
  Inputbox,
  Table,
  Pagination,
  Button,
  Graph
} from "../../Exporter/Component_Exporter"
import useFetchTicketsForAI from "../../hooks/AI/fetchTicketsForAI"
import axiosClient from "../../axiosClient"
import useFetchModelPrediction from "../../hooks/AI/Fetch_Model_Prediction"
import DemandForecast from "../../Hooks/graphs/Demand_Forecast_Chart"

export default function StaffOrderList() {
  Title("Demand Forecast")
  Body_addclass("Management-PAGE")

  const { productSold } = useFetchTicketsForAI()
  // const [forecastdata, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10 // ✅ Adjust as needed
  const tbhead = [
    "ITEM",
    "DATE",
    "PREDICTION",
    "HIGHEST PREDICTION",
    "LOWEST PREDICTION",
  ]

  const forecastdata = useFetchModelPrediction()

  // ✅ Flatten & structure forecast rows
  const tbrowsOrders = Object.keys(forecastdata || {}).flatMap((itemName) =>
    forecastdata[itemName].map((entry) => ({
      item: itemName,
      date: `${new Date(entry.ds).getFullYear()}-${(new Date(entry.ds).getMonth() + 1).toString().padStart(2, "0")}-${new Date(entry.ds).getDate().toString().padStart(2, "0")}`,
      yhat: entry.yhat.toFixed(2),
      yhat_upper: entry.yhat_upper.toFixed(2),
      yhat_lower: entry.yhat_lower.toFixed(2) <= 0 ? "0" : entry.yhat_lower.toFixed(2),
    }))
  )

  const totalPages = Math.ceil(tbrowsOrders.length / itemsPerPage)
  const paginatedRows = tbrowsOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const tbrowsOrdersAI = productSold.map((item) => ({
    ItemName: item.product_name,
    Date: item.created_at,
    Order: item.quantity,
  }))

  const sendDataToForecastModel = async (data) => {
    try {
      await fetch("https://forecast.metro7-test.shop/send-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      window.location.reload()
    } catch (error) {
      console.error("Error sending data to forecast model:", error)
    }
  }

  const { ModelData, ModelOptions, ModelTopDemand } = DemandForecast(useFetchModelPrediction())

  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox Title="Search" Type="search" />
            <Inputbox Title="Filter" Type="text" />
          </Box>
          <Box Title="Demand Forecast" Class="demandforecast" BoxCol>
            <Graph LineGraph Data={ModelData} Options={ModelOptions} />
            {ModelTopDemand && (
              <Group>
                <h3>
                  Based on the demand forecast, {ModelTopDemand.item} sales are expected to increase over
                  the next four weeks. To meet this rising demand, the business should restock more {ModelTopDemand.item} by
                  the end of this week. This proactive step will help prevent stockouts, maintain customer satisfaction,
                  and keep daily operations running smoothly.
                </h3>
              </Group>
            )}
          </Box>
          <Box Title="DEMAND FORECASTS" UpperRight={
            <Button
            Title="UPDATE FORECAST"
            Onclick={() =>
              sendDataToForecastModel(
                tbrowsOrdersAI.map((row) => ({
                  ItemName: row.ItemName,
                  Date: new Date(row.Date).toLocaleDateString(),
                  Order: row.Order,
                }))
              )
            }
          /> } BoxCol>
            <Table HeadRows={tbhead} DataRows={paginatedRows} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Main>
      </Group>
    </>
  )
}