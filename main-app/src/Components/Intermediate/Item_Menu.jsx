import React, { useState, useEffect } from 'react'
import '../../Assets/CSS/Components/Item_Menu.sass'
import { ScreenWidth, Button } from '../../Exporter/Component_Exporter'
import axiosClient from "../../axiosClient"

export default function ItemMenu({ Class, List, AuthenticatedMode, ServiceMode, AddItem, RemoveItem, CheckedOrders = [] }) {
    const screenwidth = ScreenWidth()
    const [maxQuantities, setMaxQuantities] = useState({})

    // Function to check max quantity for a specific product
    const checkMaxQuantity = async (productId, currentCart) => {
        try {
            const response = await axiosClient.post('/create-order-max-quantity', {
                product_id: productId,
                cart: currentCart
            });
            return response.data.max_quantity;
        } catch (error) {
            console.error('Error checking max quantity:', error);
            return 0;
        }
    };

    // Update max quantities when checked orders change
    useEffect(() => {
        const updateMaxQuantities = async () => {
            const currentCart = CheckedOrders.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }));

            const newMaxQuantities = {};

            // Check max quantity for each product in the list
            await Promise.all(
                List.map(async (product) => {
                    const maxQty = await checkMaxQuantity(product.id, currentCart);
                    newMaxQuantities[product.id] = maxQty;
                })
            );

            setMaxQuantities(newMaxQuantities);
        };

        if (List.length > 0) {
            updateMaxQuantities();
        }
    }, [CheckedOrders, List]);

    return (
        <>
            { List.map((Menu) => {
                const checkedItem = CheckedOrders.find(item => item.id === Menu.id)
                const currentQuantity = checkedItem ? checkedItem.quantity : 0

                // Use dynamic max quantity instead of static Menu.quantity
                const maxQuantity = maxQuantities[Menu.id] || 0
                const isMaxQuantityReached = currentQuantity >= maxQuantity

                return (
                    <div className={`item ${Class}`} key={Menu.id}>
                        { !ServiceMode && <img src={Menu.image} alt={``}/> }
                        <article>
                            <h3>{Menu.product_name}</h3>
                            <h3>₱{Menu.price}</h3>
                            {/* Optional: Show remaining quantity */}
                            <small>Available: {Math.max(0, maxQuantity - currentQuantity)}</small>
                        </article>
                        {( AuthenticatedMode || ServiceMode ) && (
                            Menu.is_available ?
                                screenwidth > 766 ?
                                    <Button
                                        Title={`ADD`}
                                        ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-add-btn`}
                                        Onclick={() => AddItem(Menu)}
                                        Disabled={isMaxQuantityReached}
                                    />
                                    :
                                    <div>
                                        <Button
                                            Title={`<`}
                                            ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-rm-btn`}
                                            Onclick={() => RemoveItem(Menu.id)}
                                            Disabled={currentQuantity === 0}
                                        />
                                        <h3>x{currentQuantity}</h3>
                                        <Button
                                            Title={`>`}
                                            ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-add-btn`}
                                            Onclick={() => AddItem(Menu)}
                                            Disabled={isMaxQuantityReached}
                                        />
                                    </div>
                                :
                                <h3>Unavailable</h3>
                        )}
                    </div>
                )
            })}
        </>
    )
}
