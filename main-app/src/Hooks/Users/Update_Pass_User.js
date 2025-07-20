import { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import axiosClient from '../../axiosClient'

export default function useUpdatePassUser() {
    const [password, setPassword] = useState(``)
    const [passwordConfirmation, setPasswordConfirmation] = useState(``)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const navigate = useNavigate()
    const { token } = useParams()
    const query = new URLSearchParams(useLocation().search)
    const email = query.get(`email`)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            await axiosClient.post(`/reset-password`, {
                email,
                token,
                password,
                password_confirmation: passwordConfirmation,
            })

            setSuccess(`Password has been reset. You can now log in.`)
            setTimeout(() => navigate(`/login`), 2000)
        }
        catch (err) {
            setError(
                err.response?.data?.message || `Reset failed, please try again.`
            )
        }
        finally {
            setIsLoading(false)
        }
    }

    return {password, setPassword, passwordConfirmation, setPasswordConfirmation, handleSubmit, isLoading, error, success}
}