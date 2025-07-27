import { useEffect, useState } from "react";
import axiosClient from "../../../axiosClient";
import usePagination from "../../Universal/pagination_function";

export default function useReservationFunctions() {
    const [reservations, setReservations] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const { currentPage, totalPages, setTotalPages, handlePageChange } = usePagination();
    const [ filter, setFilter ] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedReservation((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        fetchReservation(currentPage, filter);
    }, [currentPage, filter]);

    const fetchReservation = async (page, filter) => {
        let url = `/reservations?page=${page}`;
        if (filter) {
            url += `&search=${encodeURIComponent(filter)}`;
        }
        const response = await axiosClient.get(url);
        setReservations(response.data.data);
        setTotalPages(response.data.last_page);
    }

    const updateReservation = (res) => {
        setSelectedReservation(res);
    }

    //update function for reservation
    const updateReservationStatus = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await axiosClient.put(`/update-Reservation-Status/${selectedReservation.id}`,
                { status: selectedReservation.status }
            )
            setSuccess("Reservation updated successfully.")
            document.querySelector(".modal")?.scrollTo({ top: 0, behavior: "smooth" })
            fetchReservation()
        }
        catch (err) {
            setError(
                err.response?.data?.message || `Updating reservation failed, please try again.`
            )
            console.error(`Error updating reservation:`, err)
        }
        finally {
            setIsLoading(false)
        }
    }

    return {
        reservations,
        selectedReservation,
        updateReservation,
        updateReservationStatus,
        handleInputChange,
        isLoading,
        error,
        success,
        currentPage,
        totalPages,
        handlePageChange,
        setFilter,
    }
}
