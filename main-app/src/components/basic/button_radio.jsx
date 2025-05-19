import React from 'react'
import '../../assets/css/components/button.sass'

export default function Radio({ Class, Title, RadioName, Value, BtnWhite }) {
    return(
        <label className={ `btnradio ${BtnWhite ? 'btnwhite' : undefined} ${Class}` }>
            <input type='radio' 
            name={ RadioName } 
            value={ Value }/>
            <h3>{ Title }</h3>
        </label>
    )
}