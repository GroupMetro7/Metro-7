import React from 'react';
import '../../assets/css/components/item_menu.sass';
import { Button } from '../../exporter/component_exporter';

export default function ItemMenu({ Class, List, addItemToOrder, removeItemFromOrder }) {
    return (
        <>
            {List.map((Menu, index) => (
                <div className={`item ${Class}`} key={index}>
                    <article>
                        <h2>{Menu.product_name}</h2>
                        <h3>₱{Menu.price}</h3>
                    </article>
                    <div>
                        <Button Title="ADD" Onclick={() => addItemToOrder(Menu)} />
                        <div className="quantity">
                            <Button Title="-" Onclick={() => removeItemFromOrder(Menu.id)} />
                            <h3></h3>
                            <Button Title="+" Onclick={() => addItemToOrder(Menu)} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
