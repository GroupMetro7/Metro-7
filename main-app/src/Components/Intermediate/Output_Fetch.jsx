import React from 'react'
import '../../assets/css/components/output_fetch.sass'

export default function Outputfetch({ ID, Class, Title, Value, OutCol, OutWhite }) {

    return(
        <label id={ ID } className={ `outputfetch ${ OutCol && 'outcol' } ${ OutWhite && 'outwhite' } ${ Class }` }>
            { Title && <h4>{`${ Title }:`}</h4> }
            <h3>{ Value }</h3>
        </label>
    )
}