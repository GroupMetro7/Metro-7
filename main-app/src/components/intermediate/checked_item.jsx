import React from 'react'
import '../../assets/css/components/checked_item.sass'
import { Button } from '../../exporter/component_exporter'

export default function CheckedItem({ Class, List, Quantity }) {

    return(
        <>
        { List.map(( Menu ) => (
            <div className={`checkeditem ${ Class }`}>
                <img src={ Menu[2] }/>
                <article>
                    <h3>{ Menu[0] }</h3>
                    <div>
                        <h3>₱{ Menu[1] }</h3>
                        <div className='quantity'>
                            <Button Title='-'/>
                            <h3>{ Quantity }</h3>
                            <Button Title='+'/>
                        </div>
                    </div>
                </article>
            </div>
        ))}
        </>
    )
}