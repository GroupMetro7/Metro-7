import React from 'react'
import '../../Assets/CSS/Components/Button.sass'

export default function Radio({ ID, Class, Title, RadioName, Value, BtnWhite, Checked, Disabled, OnChange }) {
    return(
        <label className={`btnradio ${BtnWhite && `btnwhite`} ${Class}` }>
            <input type={`radio`}
            id={ ID }
            name={ RadioName }
            value={ Value }
            checked={ Checked }
            disabled={Disabled}
            onChange={ OnChange }
            />
            <h3>{ Title }</h3>
        </label>
    )
}