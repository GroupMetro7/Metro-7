import React from 'react'
import '../../Assets/CSS/Components/Item_Menu.sass'
import { ScreenWidth, Button } from '../../Exporter/Component_Exporter'

export default function ItemMenu({ Class, List, AuthenticatedMode, ServiceMode, AddItem, RemoveItem }) {
    const screenwidth = ScreenWidth()

    return (
        <>
            { List.map((Menu) => (
                <div className={`item ${Class}`} key={Menu}>
                    { !ServiceMode && <img src={Menu.image} alt={``}/> }
                    <article>
                        <h3>{Menu.product_name}</h3>
                        <h3>₱{Menu.price}</h3>
                    </article>
                    {( AuthenticatedMode || ServiceMode ) && (
                        Menu.is_available ? 
                            screenwidth > 766 ?
                                <Button Title={`ADD`} ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-add-btn`} Onclick={() => AddItem(Menu)} />
                                :
                                <div>
                                    <Button Title={`<`} ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-rm-btn`} Onclick={() => RemoveItem(Menu.id)} />
                                    <h3>x{Menu.quantity}</h3>
                                    <Button Title={`>`} ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-add-btn`} Onclick={() => AddItem(Menu)} />
                                </div>
                            : 
                            <h3>Unavailable</h3>
                    )}
                </div>
            ))}
        </>
    )
}
