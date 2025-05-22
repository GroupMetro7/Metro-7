import { useEffect, useState } from "react"
import axiosClient from "../axiosClient"

export default function useMonthlySales() {
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [mostSoldProduct, setMostSoldProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosClient.get('/monthlyRevenue')
            .then(response => {
                setMonthlyRevenue(response.data.monthlyRevenue || []);
                setMostSoldProduct(response.data.mostSoldProduct || null);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return { monthlyRevenue, mostSoldProduct, loading, error };
}
