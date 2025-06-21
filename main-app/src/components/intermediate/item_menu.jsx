import React from 'react';
import '../../assets/css/components/item_menu.sass';
import { Button } from '../../exporter/component_exporter';

export default function ItemMenu({ Class, List, AuthenticatedMode, ServiceMode, addItemToOrder }) {
    return (
        <>
            { List.map((Menu, index) => (
                <div className={`item ${Class}`} key={index}>
                    { !ServiceMode && <img src={Menu.image} alt=""/> }
                    <article>
                        <h3>{Menu.product_name}</h3>
                        <h3>₱{Menu.price}</h3>
                    </article>
                    {( AuthenticatedMode || ServiceMode ) && (
                        Menu.is_available ? 
                        <Button Title="ADD" Onclick={() => addItemToOrder(Menu)} />
                        : 
                        <h3>Unavailable</h3>
                    )}
                </div>
            ))}
        </>
    );
}
