import React from 'react'
import '../../assets/css/components/item_menu.sass'
import { Button } from '../../exporter/component_exporter'

export default function ItemMenu({ Class, List, AuthenticatedMode }) {

    return(
        <>
        { List.map(( Menu ) => (
            <div className={`item ${ Class }`}>
                <img src=''/>
                <article>
                    <h2>{ Menu[1] }</h2>
                    <h3>₱{ Menu[3] }</h3>
                    { AuthenticatedMode ? 
                        <div>
                            <Button Title='ADD' />
                            <div className='quantity'>
                                <Button Title='-'/>
                                <h3></h3>
                                <Button Title='+'/>
                            </div>
                        </div>
                    :
                        undefined
                    }
                </article>
            </div>
        ))}
        </>
    )
}