import { useState, useEffect, useRef } from 'react'
import axiosClient from "../../axiosClient"
import { useStateContext } from '../../contexts/ContextProvider'

export default function useUpdateOrders( selectedOrder, fetchOrder ) {
    const [formData, setFormData] = useState({
        cashPayment: "",
        onlinePayment: "",
        downpayment: "",
        refNumber: "",
        status: "",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const { getPendingOrdersCount } = useStateContext();

    useEffect(() => {
        if (selectedOrder) {
            setFormData({
                cashPayment: selectedOrder?.cashPayment,
                onlinePayment: selectedOrder?.onlinePayment,
                downpayment: selectedOrder?.downpayment,
                refNumber: selectedOrder?.refNumber,
                status: selectedOrder?.status,
            })
        }
    }, [selectedOrder])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await axiosClient.put(`/orderList/${selectedOrder.id}`, {
                cashPayment: formData.cashPayment,
                onlinePayment: formData.onlinePayment,
                downpayment: formData.downpayment,
                refNumber: formData.refNumber,
                status: formData.status,
            })
            setSuccess("Order updated successfully!")
            document.querySelector(".modal")?.scrollTo({ top: 0, behavior: "smooth" })
            fetchOrder();
            getPendingOrdersCount();
        }
        catch (err) {
            setError(
                err.response?.data?.message || `Updating order failed, please try again.`
            )
            console.error(`Error updating order:`, err)
        }
        finally {
            setIsLoading(false)
        }
    }

    return {formData, setFormData, handleSubmit, handleInputChange, isLoading, error, success}
}
