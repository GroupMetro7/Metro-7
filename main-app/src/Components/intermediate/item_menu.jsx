import React from 'react';
import '../../assets/css/components/item_menu.sass';
import { Button } from '../../exporter/component_exporter';

export default function ItemMenu({ Class, List, addItemToOrder, auth }) {
    return (
        <>
            {List.map((Menu, index) => (
                <div className={`item ${Class}`} key={index}>
                    <article>
                    {/* included the image so i can use it from service, customer auth and customer unauth */}
                        <img src={Menu.image} alt=""/>
                        <h2>{Menu.product_name}</h2>
                        <h3>₱{Menu.price}</h3>
                    </article>
                    {/* Eryck, I added new exception here for authenticated and unauthenticated */}
                    {Menu.is_available ? (
                        auth ? (
                            <Button Title="ADD" Onclick={() => addItemToOrder(Menu)} />
                        ) : null
                    ) : (
                        <p>Unavailable</p>
                    )}

                </div>
            ))}
        </>
    );
}
