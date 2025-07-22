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
    const [freeItemsRemaining, setFreeItemsRemaining] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const audioRef = useRef(null)

    const calculateTotalPrice = (updatedOrder) => {
        const total = updatedOrder.reduce((sum, item) => sum + item.price * item.quantity, 0)
        if (AuthenticatedMode) {
            setFormData(prev => ({ ...prev, totalPrice: total }))
        }
        if (ServiceMode) {
            setTotalPrice(total)
        }
    }

const updateFreeItemsRemaining = (currentOrder) => {

const totalCustomizableItems = currentOrder
  .filter(item => {
    return item.is_customizable == 1 || item.is_customizable === true || item.is_customizable === "1";
  })
  .reduce((total, item) => total + item.quantity, 0);


  const usedFreeItems = currentOrder
    .filter(item => item.is_free_item === true)
    .reduce((total, item) => total + item.quantity, 0);


  const totalAllowedFreeItems = totalCustomizableItems * 6;
  const remainingFreeItems = Math.max(0, totalAllowedFreeItems - usedFreeItems);


  setFreeItemsRemaining(remainingFreeItems);
};

const addItemToOrder = (item) => {
  setOrder(prev => {
    let updatedOrder;


      // Use the EXACT logic from Dashboard.jsx
      const existingItem = prev.find((orderItem) => orderItem.id === item.id);
      const existingFreeItem = prev.find((orderItem) => orderItem.id === item.id && orderItem.is_free_item === true);
      const existingPaidItem = prev.find((orderItem) => orderItem.id === item.id && !orderItem.is_free_item);

      if (item.is_customizable === 1) {
        // Handle customizable items (buckets)
        if (existingItem) {
          updatedOrder = prev.map((orderItem) =>
            orderItem.id === item.id
              ? { ...orderItem, quantity: orderItem.quantity + 1 }
              : orderItem
          );
        } else {
          updatedOrder = [...prev, { ...item, quantity: 1 }];
        }
      } else if (freeItemsRemaining > 0 && item.category_id === 3) {
        // Add as free item
        if (existingFreeItem) {
          updatedOrder = prev.map((orderItem) =>
            orderItem.id === item.id && orderItem.is_free_item === true
              ? { ...orderItem, quantity: orderItem.quantity + 1 }
              : orderItem
          );
        } else {
          updatedOrder = [...prev, { ...item, quantity: 1, price: 0, is_free_item: true }];
        }
      } else {
        // Add as paid item (regular price)
        if (existingPaidItem) {
          updatedOrder = prev.map((orderItem) =>
            orderItem.id === item.id && !orderItem.is_free_item
              ? { ...orderItem, quantity: orderItem.quantity + 1 }
              : orderItem
          );
        } else {
          updatedOrder = [...prev, { ...item, quantity: 1, is_free_item: false }];
        }
      }


        calculateTotalPrice(updatedOrder)
        updateFreeItemsRemaining(updatedOrder) // Always call this
        return updatedOrder
  });
};

const removeItemToOrder = (itemId, isFreeItem = null) => {
  setOrder(prev => {
    let updatedOrder;

    if (isFreeItem !== null) {
      // When called with specific free item status
      updatedOrder = prev
        .map((orderItem) => {
          if (orderItem.id === itemId && (orderItem.is_free_item || false) === isFreeItem) {
            if (orderItem.quantity > 1) {
              return { ...orderItem, quantity: orderItem.quantity - 1 };
            } else {
              return null; // Remove item completely
            }
          }
          return orderItem;
        })
        .filter((orderItem) => orderItem !== null);
    } else {
      // When called with just itemId (backward compatibility)
      updatedOrder = prev
        .map((orderItem) => {
          if (orderItem.id === itemId) {
            if (orderItem.quantity > 1) {
              return { ...orderItem, quantity: orderItem.quantity - 1 };
            } else {
              return null; // Remove item completely
            }
          }
          return orderItem;
        })
        .filter((orderItem) => orderItem !== null);
    }

    calculateTotalPrice(updatedOrder);
    updateFreeItemsRemaining(updatedOrder);
    return updatedOrder;
  });
};

    useEffect(() => {
        audioRef.current = new Audio("/notification_tone.mp3")
        audioRef.current.preload = "auto"
    }, [])

    const playNotificationSound = () => {
        if (audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.log("Audio play failed:", error)
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(null)

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
            await axiosClient.post(ServiceMode ? "/orders" : "/create-order-Customer", payload)
            setSuccess("Order submitted successfully!")
            document.querySelector(".modal")?.scrollTo({ top: 0, behavior: "smooth" })
            setTimeout(() => window.location.reload(), 2000)

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
                err.response?.data?.error || `Submitting order failed, please try again.`
            )
            console.error(`Error submitting order:`, err)
        }
        finally {
            setIsLoading(false)
        }
    }

    const sharedValues = {
        order,
        addItemToOrder,
        removeItemToOrder,
        handleSubmit,
        discount,
        setDiscount,
        diningOpt,
        setDiningOpt,
        isLoading,
        error,
        success,
    }

    if (AuthenticatedMode) {
        return {
            ...sharedValues,
            formData,
            setFormData,
            freeItemsRemaining
        }
    }

    if (ServiceMode) {
        return {
            ...sharedValues,
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
        }
    }
    return {
        ...sharedValues,
        formData: {},
        setFormData: () => {},
        totalPrice: 0,
        customer: "",
        setCustomer: () => {},
        cashPayment: 0,
        setCashPayment: () => {},
        onlinePayment: 0,
        setOnlinePayment: () => {},
        mealStub: "",
        setMealStub: () => {},
        freeItemsRemaining: 0,
    }
}
