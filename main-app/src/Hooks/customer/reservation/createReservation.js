import { useState } from 'react'
import axiosClient from '../../../axiosClient'

export default function useCreateReservation() {
    const [formData, setFormData] = useState({
        reservationType: ``,
        partySize: ``,
        date: ``,
        time: ``
    })
    const [success, setSuccess] = useState(``)
    const [error, setError] = useState(``)
    const [isLoading, setIsLoading] = useState(false)
    const token = localStorage.getItem(`ACCESS_TOKEN`)

    const today = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, `0`)}-${new Date().getDate().toString().padStart(2, `0`)}`
    const [minDateTime, setMinDateTime] = useState(``)

    const handleInputChange = (e) => {
        const { name, value, files } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    }

    const handleCreateReservation = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsLoading(true)

        if (!token) {
            setError(`You need to be registered and logged in to make a reservation.`)
            return
        }

        try {
            await axiosClient.post(`/createReservation`, formData)
            setFormData({
                reservationType: ``,
                partySize: ``,
                date: ``,
                time: ``
            })

            setSuccess(`Reservation created successfully please wait for confirmation!`)
            setIsLoading(false)
        }
        catch (err) {
            setError(
                err.response?.data?.message || `Failed to create reservation, please try again later.`
            )
            console.error(`Error creating reservation:`, err)
        }
        finally {
            setIsLoading(false)
        }
    }

    return {
        formData,
        setFormData,
        handleInputChange,
        handleCreateReservation,
        isLoading,
        success,
        error,
        today,
        minDateTime
    }
}
