import React from 'react'
import '../../Assets/CSS/Components/Output_Fetch.sass'

export default function Outputfetch({ ID, Class, Title, Value, OutCol, OutWhite }) {

    return(
        <label id={ ID } className={ `outputfetch ${ OutCol && 'outcol' } ${ OutWhite && 'outwhite' } ${ Class }` }>
            { Title && <h4>{`${ Title }:`}</h4> }
            <h3>{ Value }</h3>
        </label>
    )
}