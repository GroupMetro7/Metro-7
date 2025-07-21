import { useState, useEffect, useRef } from 'react'
import axiosClient from '../../axiosClient'

export default function useRetrieveOrdersList() {
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(1)
    const [ingredients, setIngredients] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)

    const [searchItem, setSearchItem] = useState("") // string instead of []

    const intervalRef = useRef(null)
    const previousOrderIdsRef = useRef([])

    const fetchOrder = (page, search) => {
        let url = `/orders?page=${page}`
        if (search) {
            url += `&search=${encodeURIComponent(search)}`
        }

        axiosClient.get(url).then((data) => {
            const newOrders = data.data.data
            const newOrderIds = newOrders.map((order) => order.id)

            previousOrderIdsRef.current = newOrderIds
            setOrders(newOrders)
            setCurrentPage(data.data.current_page)
            setTotalPages(data.data.last_page)
        })
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const fetchIngredients = () => {
        axiosClient.get("/ingredients").then((res) => {
            setIngredients(Array.isArray(res.data) ? res.data : res.data.data || [])
        })
    }

    const fetchCategories = () => {
        axiosClient.get("/categories").then((res) => {
            setCategories(res.data)
        })
    }

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }

        fetchOrder(currentPage, searchItem)
        fetchIngredients()
        fetchCategories()

        intervalRef.current = setInterval(() => {
            fetchOrder(currentPage, searchItem)
        }, 10000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [currentPage, searchItem])

    return {
        orders,
        selectedOrder,
        setSelectedOrder,
        currentPage,
        totalPages,
        handlePageChange,
        setSearchItem,
        fetchOrder
    }
}
