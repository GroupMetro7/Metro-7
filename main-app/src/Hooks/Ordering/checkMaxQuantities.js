import { useState, useEffect } from 'react';
import axiosClient from "../../axiosClient";

export default function useCheckMaxQuantities(){
      const [maxQuantities, setMaxQuantities] = useState({})

    // Function to check max quantity for a specific product
    const checkMaxQuantity = async (productId, currentCart) => {
        try {
            const response = await axiosClient.post('/create-order-max-quantity', {
                product_ids: [productId],
                cart: currentCart
            });
            return response.data.max_quantities[productId];
        } catch (error) {
            console.error('Error checking max quantity:', error);
            return 0;
        }
    };

    return {
        maxQuantities,
        setMaxQuantities,
        checkMaxQuantity
    }
}


