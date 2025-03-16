import React from 'react'
import '../../assets/css/components/box.sass'

export default function Box({ children, Class, Title, BoxCol }) {
    return(
        <div className={`box ${ BoxCol ? 'boxcol' : undefined } ${ Class }`}>
            { Title ? <h2>{ Title }</h2> : undefined}
            { children }
        </div>
    )
}