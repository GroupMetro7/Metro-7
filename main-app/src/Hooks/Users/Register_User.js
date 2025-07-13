import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../axiosClient'

export default function useRegisterUser() {
    const [formData, setFormData] = useState({
        firstname: ``,
        lastname: ``,
        email: ``,
        contact: ``,
        password: ``,
        passwordConfirmation: ``,
    })

    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setSuccess(null)
        setIsLoading(true)

        try {
            const {firstname, lastname, email, contact, password, passwordConfirmation} = formData

            await axiosClient.post(`/register`, {
                firstname,
                lastname,
                email,
                contact,
                password,
                password_confirmation: passwordConfirmation,
            })

            setSuccess(`Please verify your email address to complete registration.`)
            setTimeout(() => { navigate(`/login`) }, 2000)
        }
        catch (err) {
            setError(
                err.response?.data?.message || `Registration failed, please try again.`
            )
        }
        finally {
            setIsLoading(false)
        }
    }

    return {formData, setFormData, handleSubmit, isLoading, error, success}
}