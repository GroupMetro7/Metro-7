import React from 'react'
import '../../assets/css/components/button.sass'

export default function InsertFileButton({ ID, Class, Title, BtnWhite, Accept, Name, OnChange }) {
    return(
        <label className={ `btnfile ${BtnWhite && 'btnwhite' } ${Class}` }>
            <input type='file'
            id={ ID }
            accept= { Accept }
            name = { Name }
            onChange= { OnChange }
            />
            <h3>{ Title }</h3>
        </label>
    )
}
