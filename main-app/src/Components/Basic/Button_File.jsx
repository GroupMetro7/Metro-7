import React from 'react'
import '../../Assets/CSS/Components/Button.sass'

export default function InsertFileButton({ ID, Class, Title, BtnWhite, Accept, Name, Disabled, OnChange }) {
    return(
        <label className={ `btnfile ${BtnWhite && `btnwhite`} ${Class}`}>
            <input type={`file`}
            id={ ID }
            accept= { Accept }
            name = { Name }
            disabled={Disabled}
            onChange= { OnChange }
            />
            <h3>{ Title }</h3>
        </label>
    )
}
