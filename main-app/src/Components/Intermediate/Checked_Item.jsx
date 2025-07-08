import React from 'react'
import '../../assets/css/components/checked_item.sass'
import { Button } from '../../exporter/component_exporter'

export default function CheckedItem({ Class, List, addItemToOrder, removeItemFromOrder }) {

    return(
        <>
        { List.length ? 
            ( List.map(( Menu ) => (
                <div className={`checkeditem ${ Class }`}>
                    <div>
                        <h3>{ Menu.product_name }</h3>
                        <h4>₱{ Menu.price }</h4>
                    </div>
                    <div>
                        <Button Title="&lt;" Onclick={() => removeItemFromOrder(Menu.id)}/>
                        <h3>x{Menu.quantity}</h3>
                        <Button Title="&gt;"  Onclick={() => addItemToOrder(Menu)}/>
                    </div>
                </div>
            ))) 
            : 
            <h5>No Added Items</h5>
        }
        </>
    )
}
