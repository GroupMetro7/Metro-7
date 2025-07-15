import React from 'react'
import '../../Assets/CSS/Components/Checked_Item.sass'
import { Button } from '../../Exporter/Component_Exporter'

export default function CheckedItem({ Class, List, addItemToOrder, removeItemFromOrder }) {

    return(
        <>
            {List.length ?
                List.map((Menu) => (
                    <div key={Menu.id} className={`checkeditem ${Class}`}>
                        <div>
                            <h3>{Menu.product_name}</h3>
                            <h4>₱{Menu.price}</h4>
                        </div>
                        <div>
                            <Button Title={`<`} ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-rm-btn`} Onclick={() => removeItemFromOrder(Menu.id)} />
                            <h3>x{Menu.quantity}</h3>
                            <Button Title={`>`} ID={`${Menu.product_name.toLowerCase().replace(/\s+/g, `-`)}-add-btn`} Onclick={() => addItemToOrder(Menu)} />
                        </div>
                    </div>
                ))
                :
                <h5>No Added Items</h5>
            }
        </>
    )
}
