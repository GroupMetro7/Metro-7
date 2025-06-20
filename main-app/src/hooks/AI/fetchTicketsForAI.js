import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function useFetchTicketsForAI() {
  const [productSold, setProductSold] = useState([]);

  useEffect(() => {
    axiosClient.get("/FetchAIData")
      .then((data) => {
        setProductSold(data.data);
      })
      .catch((error) => {
        console.error("Error fetching AI data:", error);
      });
  }, []);

  return { productSold };
}
