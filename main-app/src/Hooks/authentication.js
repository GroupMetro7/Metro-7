import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axiosClient from "../axiosClient";
import { useStateContext } from '../Contexts/ContextProvider';

export default function useAuthentication() {
    const { setUser, setToken } = useStateContext();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const { email, password } = formData;

            const response = await axiosClient.post("/login", {
                email,
                password,
            });

            setUser(response.data.user);
            setToken(response.data.token);

            const role = response.data.user.role;
            if (role === "customer") {
                navigate("/");
            } else if (role === "employee") {
                navigate("/service");
            } else if (role === "admin") {
                navigate("/admin");
            }
        }
        catch (err) {
            setError(
                err.response?.data?.message || "Login failed, please try again."
            );
        }
        finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        setFormData,
        handleSubmit,
        isLoading,
        error,
    };
}