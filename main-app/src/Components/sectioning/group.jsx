import React from 'react'
import '../../assets/css/components/group.sass'

export default function Group({ children, Class, Col, Wrap }) {
    return(
        <div className={`group ${ Col ? 'col' : undefined } ${ Wrap ? 'wrap' : undefined } ${ Class }`}>
            { children }
        </div>
    )
}