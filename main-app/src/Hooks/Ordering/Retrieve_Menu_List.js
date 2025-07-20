import { useState, useEffect, useRef } from 'react'
import axiosClient from '../../axiosClient'

export default function useRetrieveMenuList() {
    const [menuItems, setMenuItems] = useState([])

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(1)

    const [searchItem, setSearchItem] = useState([])

    const intervalRef = useRef([]);

    // Retrieve Categories
    const fetchCategories = () => {
        axiosClient.get(`/categories`).then((res) => {
            setCategories(res.data)
        })
    }

    // Retrieve Menu for Searching & Selecting Category
    const fetchMenuData = (category, search) => {
        const params = {}
        if (search) params.search = search
        if (category) params.category_id = category

        axiosClient
            .get('/menuData', { params })
            .then(res => setMenuItems(res.data))
            .catch(err => console.error(`Error fetching menu data:`, err))
    }
    
    useEffect(() => {
        fetchCategories()
        fetchMenuData(selectedCategory, searchItem)

        intervalRef.current = setInterval(() => {
            fetchMenuData(selectedCategory, searchItem)
        }, 10000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }
        }
    }, [selectedCategory, searchItem])

    return {menuItems, categories, setSearchItem, selectedCategory, setSelectedCategory}
}