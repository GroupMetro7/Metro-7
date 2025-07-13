import { useState } from 'react'
import axiosClient from '../../axiosClient'

export default function useFetchEmailUser() {
    const [email, setEmail] = useState(``)

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsLoading(true)

        try {
            await axiosClient.post(`/forgot-password`, { email })
            setSuccess(`Password reset link sent to your email!`)
        } 
        catch (err) {
            setError(
                err.response?.data?.message || err.response?.data?.email || `Failed to send reset link, please try again.`
            )
        }
        finally {
            setIsLoading(false)
        }
    }

    return {email, setEmail, handleSubmit, isLoading, error, success}
}