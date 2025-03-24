import React from 'react'
import '../../assets/css/components/prep_order.sass'
import { Button } from '../../exporter/component_exporter'

export default function PrepOrder({ Class, List }) {

    return(
        <>
        { List.map(( Order, index ) => (
            <div className={ `order ${ Class }` }>
                <h4>{ Order[0] }</h4>
                <h3>{ Order[1] }</h3>
                <Button Title='VIEW' Key={ index } OpenModal='ViewModal' />
            </div>
        ))}
        </>
    )
}