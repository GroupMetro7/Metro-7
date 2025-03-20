import React from 'react'
import '../../assets/css/components/item_menu.sass'

export default function ItemMenu({ Class, List }) {

    return(
        <>
        { List.map(( Menu ) => (
            <div className={`item ${ Class }`}>
                <img src={ Menu[2] }/>
                <article>
                    <h2>{ Menu[0] }</h2>
                    <h3>₱{ Menu[1] }</h3>
                </article>
            </div>
        ))}
        </>
    )
}