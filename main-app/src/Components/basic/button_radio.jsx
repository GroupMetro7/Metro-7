import React from 'react'
import '../../assets/css/components/button.sass'

export default function Radio({ Class, Title, RadioName, Value, BtnWhite, Checked, OnChange }) {
    return(
        <label className={ `btnradio ${BtnWhite && 'btnwhite' } ${Class}` }>
            <input type='radio'
            name={ RadioName }
            value={ Value }
            checked={ Checked }
            onChange={ OnChange }
            />
            <h3>{ Title }</h3>
        </label>
    )
}
