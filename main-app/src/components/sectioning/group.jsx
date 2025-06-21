import React from 'react'
import '../../assets/css/components/group.sass'

export default function Group({ children, Class, Col, Wrap }) {
    return(
        <div className={`group ${ Col && 'col' } ${ Wrap && 'wrap' } ${ Class }`}>
            { children }
        </div>
    )
}