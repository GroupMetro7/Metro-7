import React from 'react'
import '../../assets/css/components/item_menu.sass'
import { ScreenWidth, Button } from '../../exporter/component_exporter'

export default function ItemMenu({ Class, List, AuthenticatedMode, ServiceMode, addItemToOrder, removeItemFromOrder }) {
    const screenwidth = ScreenWidth()

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
                            screenwidth > 766 ?
                                <Button Title="ADD" Onclick={() => addItemToOrder(Menu)} />
                                :
                                <div>
                                    <Button Title="&lt;" Onclick={() => removeItemFromOrder(Menu.id)}/>
                                    <h3>x{Menu.quantity}</h3>
                                    <Button Title="&gt;"  Onclick={() => addItemToOrder(Menu)}/>
                                </div>
                            : 
                            <h3>Unavailable</h3>
                    )}
                </div>
            ))}
        </>
    );
}
