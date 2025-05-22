import React from 'react'
import '../../assets/css/components/button.sass'

export default function InsertFileButton({ Class, Title, BtnWhite, Accept, Name, OnChange }) {
    return(
        <label className={ `btnfile ${BtnWhite ? 'btnwhite' : undefined} ${Class}` }>
            <input type='file'
            accept= { Accept }
            name = { Name }
            onChange= { OnChange }
            />
            <h3>{ Title }</h3>
        </label>
    )
}
