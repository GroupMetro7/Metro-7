import React from 'react'
import '../../assets/css/components/button.sass'

export default function InsertFileButton({ Class, Title, BtnWhite }) {
    return(
        <label className={ `btnfile ${ BtnWhite ? 'btnwhite' : null } ${ Class }` }>
            <input type='file'/>
            <h3>{ Title }</h3>
        </label>
    )
}