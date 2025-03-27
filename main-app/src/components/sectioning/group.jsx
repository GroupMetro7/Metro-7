import React from 'react'
import '../../assets/css/components/group.sass'

export default function Group({ children, Class, Col, Wrap }) {
    return(
        <div className={`group ${ Col ? 'col' : null } ${ Wrap ? 'wrap' : null } ${ Class }`}>
            { children }
        </div>
    )
}