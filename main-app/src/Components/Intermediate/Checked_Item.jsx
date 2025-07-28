import React, { useState, useEffect } from 'react'
import '../../Assets/CSS/Components/Checked_Item.sass'
import { Button } from '../../Exporter/Component_Exporter'
import axiosClient from "../../axiosClient"

export default function CheckedItem({ Class, List, AddItem, RemoveItem, products }) {
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

    // Update max quantities when list changes
    useEffect(() => {
        const updateMaxQuantities = async () => {
            const currentCart = List.map(item => ({
                product_id: item.id,
                quantity: item.quantity
            }));

            const newMaxQuantities = {};

            await Promise.all(
                List.map(async (item) => {
                    const maxQty = await checkMaxQuantity(item.id, currentCart);
                    newMaxQuantities[item.id] = maxQty;
                })
            );

            setMaxQuantities(newMaxQuantities);
        };

        if (List.length > 0) {
            updateMaxQuantities();
        }
    }, [List]);

    return(
        <>
            {List.length ?
                List.map((Menu) => {
                    const maxQuantity = maxQuantities[Menu.id] || 0;
                    const isMaxReached = Menu.quantity >= maxQuantity;

                    return (
                        <div key={Menu.id} className={`checkeditem ${Class}`}>
                            <div>
                                <h3>{Menu.product_name}</h3>
                                <h4>₱{Menu.price}</h4>
                                <h5>
                                    Stock: {isMaxReached
                                        ? "Maxed (Ingredients Limited)"
                                        : `${maxQuantity - Menu.quantity} more available`
                                    }
                                </h5>
                            </div>
                            <div>
                                <Button
                                    Title={`<`}
                                    ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-rm-btn`}
                                    Onclick={() => RemoveItem(Menu.id)}
                                />
                                <h3>x{Menu.quantity}</h3>
                                <Button
                                    Title={`>`}
                                    ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-add-btn`}
                                    Onclick={() => AddItem(Menu)}
                                    Disabled={isMaxReached}
                                />
                            </div>
                        </div>
                    )
                })
                :
                <h5>No Added Items</h5>
            }
        </>
    )
}
