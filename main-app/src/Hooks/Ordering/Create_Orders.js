import { useState, useEffect, useRef } from 'react'
import axiosClient from "../../axiosClient"

export default function useCreateOrders({ AuthenticatedMode, ServiceMode }) {
    const [order, setOrder] = useState([])
    const [diningOpt, setDiningOpt] = useState("")

    // Customers
    const [formData, setFormData] = useState({
        totalPrice: "",
        downpayment: "",
        refNumber: "",
    })

    // Service
    const [customer, setCustomer] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const [cashPayment, setCashPayment] = useState(0)
    const [onlinePayment, setOnlinePayment] = useState(0)
    const [mealStub, setMealStub] = useState("")

    const [discount, setDiscount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [freeItemsRemaining, setFreeItemsRemaining] = useState(0)

    const audioRef = useRef(null)

    const calculateTotalPrice = (updatedOrder) => {
        const total = updatedOrder.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (AuthenticatedMode) {
            setFormData(prev => ({ ...prev, totalPrice: total }));
        }
        if (ServiceMode) {
            setTotalPrice(total);
        } 
    };

    const updateFreeItemsRemaining = (currentOrder) => {
        const totalCustomizableItems = currentOrder
            .filter(item => item.is_customizable === 1)
            .reduce((sum, item) => sum + item.quantity, 0);
        const usedFreeItems = currentOrder
            .filter(item => item.is_free_item)
            .reduce((sum, item) => sum + item.quantity, 0);
        setFreeItemsRemaining(Math.max(0, totalCustomizableItems * 6 - usedFreeItems));
    }

    const addItemToOrder = (item) => {
        setOrder(prev => {
            let updatedOrder;
            const existing = prev.find(i =>
                i.id === item.id &&
                (ServiceMode ? i.is_free_item === (item.is_free_item || false) : true)
            );

            if (ServiceMode) {
                if (item.is_customizable === 1) {
                    updatedOrder = existing
                        ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
                        : [...prev, { ...item, quantity: 1 }];
                } 
                else if (freeItemsRemaining > 0 && item.category_id === 3) {
                    updatedOrder = existing
                        ? prev.map(i => (i.id === item.id && i.is_free_item)
                            ? { ...i, quantity: i.quantity + 1 }
                            : i)
                        : [...prev, { ...item, quantity: 1, price: 0, is_free_item: true }];
                } 
                else {
                    updatedOrder = existing
                        ? prev.map(i => (i.id === item.id && !i.is_free_item)
                            ? { ...i, quantity: i.quantity + 1 }
                            : i)
                        : [...prev, { ...item, quantity: 1, is_free_item: false }];
                }
            } 
            else {
                updatedOrder = existing
                    ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
                    : [...prev, { ...item, quantity: 1 }];
            }

            calculateTotalPrice(updatedOrder)
            if (ServiceMode) updateFreeItemsRemaining(updatedOrder)
            return updatedOrder
        });
    };

    const removeItemToOrder = (itemId, isFreeItem = null) => {
        setOrder(prev => {
            const updatedOrder = prev
                .map(item => {
                    const match = ServiceMode
                        ? item.id === itemId && item.is_free_item === isFreeItem
                        : item.id === itemId
                    if (match) {
                        return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : null
                    }
                    return item
                })
                .filter(Boolean)

            calculateTotalPrice(updatedOrder)
            if (ServiceMode) updateFreeItemsRemaining(updatedOrder)
            return updatedOrder
        });
    };

    useEffect(() => {
        audioRef.current = new Audio("/notification_tone.mp3")
        audioRef.current.preload = "auto";
    }, [])

    const playNotificationSound = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.log("Audio play failed:", error);
            })
        }
    }

    const submitOrder = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        const payload = {
            option: diningOpt,
            status: "pending",
            amount: ServiceMode ? totalPrice : formData.totalPrice,
            discount,
            ...(AuthenticatedMode && {
                downpayment: formData.downpayment,
                refNumber: formData.refNumber,
                cashPayment: 0,
            }),
            ...(ServiceMode && {
                customer_name: customer,
                cashPayment,
                onlinePayment,
            }),
            tickets: order.map(item => ({
                product_id: item.id,
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.price * item.quantity,
            })),
        }

        try {
            await axiosClient.post(ServiceMode ? "/orders" : "/create-order-Customer", payload);
            setSuccess("Order submitted successfully!");
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => window.location.reload(), 2000);

            if (AuthenticatedMode) {
                setFormData({ 
                    totalPrice: "", 
                    downpayment: "", 
                    refNumber: "" 
                })
            }
            if (ServiceMode) {
                playNotificationSound()
                
                setTotalPrice(0)
                setCustomer("")
                setCashPayment(0)
                setOnlinePayment(0)
                setFreeItemsRemaining(0)
            } 
            setDiscount(0)
            setOrder([])
        } 
        catch (err) {
            setError(
                err.response?.data?.message || `Submitting order failed, please try again.`
            )
            console.error(`Error submitting order:`, error);
        }
        finally {
            setIsLoading(false)
        }
    }

    if (AuthenticatedMode) {
        return {
            formData,
            setFormData,

            order,
            addItemToOrder,
            removeItemToOrder,
            submitOrder,
            discount,
            setDiscount,
            diningOpt,
            setDiningOpt,
            isLoading,
            error,
            success,
        }
    }

    if (ServiceMode) {
        return {
            totalPrice,
            customer,
            setCustomer,
            cashPayment,
            setCashPayment,
            onlinePayment,
            setOnlinePayment,
            mealStub,
            setMealStub,
            freeItemsRemaining,

            order,
            addItemToOrder,
            removeItemToOrder,
            submitOrder,
            discount,
            setDiscount,
            diningOpt,
            setDiningOpt,
            isLoading,
            error,
            success,
        }
    }
}