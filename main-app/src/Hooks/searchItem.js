import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";

export default function useSearchItem(apiEndpoint) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `${apiEndpoint}?q=${encodeURIComponent(searchTerm)}`;
        const response = await axiosClient.get(url);
        setFilteredItems(response.data.data || []);
      } catch (error) {
        setFilteredItems([]);
      }
    };

    if (searchTerm) {
      fetchData();
    } else {
      setFilteredItems([]);
    }
  }, [searchTerm, apiEndpoint]);

  return { searchTerm, setSearchTerm, filteredItems };
}
