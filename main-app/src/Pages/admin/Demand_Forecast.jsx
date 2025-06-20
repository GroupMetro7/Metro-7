import React, { useEffect, useState } from "react";
import "../../assets/css/pages/services/Management.sass";
import {
  Title,
  Body_addclass,
  Group,
  Main,
  Box,
  Inputbox,
  Table,
  Button,
  Modal,
  Form,
  Outputfetch,
  SubmitButton,
  Selectionbox,
  InsertFileButton,
  Pagination,
} from "../../exporter/component_exporter";
import useFetchTicketsForAI from "../../hooks/AI/fetchTicketsForAI";

export default function StaffOrderList() {
  Title("Demand Forecast");
  Body_addclass("Management-PAGE");

  const { productSold } = useFetchTicketsForAI();

  const [data, setData] = useState([]);

  // Example useEffect for fetching data (uncomment and adjust as needed)
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const tbhead = [
    "ITEM",
    "DATE",
    "PREDICTION",
    "HIGHEST PREDICTION",
    "LOWEST PREDICTION",
  ];

  const tbrowsOrders = Object.keys(data).flatMap((itemName) =>
    data[itemName].map((entry) => ({
      item: itemName,
      date: `${new Date(entry.ds).getFullYear()}-${(
        new Date(entry.ds).getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${new Date(entry.ds)
        .getDate()
        .toString()
        .padStart(2, "0")}`,
      yhat: entry.yhat.toFixed(2),
      yhat_upper: entry.yhat_upper.toFixed(2),
      yhat_lower:
        entry.yhat_lower.toFixed(2) <= 0 ? "0" : entry.yhat_lower.toFixed(2),
    }))
  );

  const tbrowsOrdersAI = productSold.map((item) => ({
    ItemName: item.product_name,
    Date: item.created_at,
    Order: item.quantity,
  }));

  const sendDataToForecastModel = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/send-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error sending data to forecast model:", error);
      return null;
    }
  };

  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox Title="Search" Type="search" />
            <Inputbox Title="Filter" Type="text" />
          </Box>
          <Button
            Title="SEND TO MODEL"
            Onclick={() =>
              sendDataToForecastModel(
                tbrowsOrdersAI.map((row) => ({
                  ItemName: row.ItemName,
                  Date: new Date(row.Date).toLocaleDateString(),
                  Order: row.Order,
                }))
              )
            }
          />
          <Box Title="ACTIVITY LOGS" BoxCol>
            <Table HeadRows={tbhead} DataRows={tbrowsOrders} />
            {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
          </Box>
        </Main>
      </Group>
    </>
  );
}
