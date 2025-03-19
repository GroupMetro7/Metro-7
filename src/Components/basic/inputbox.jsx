import React from 'react'
import '../../assets/css/components/inputbox & selectbox.sass'

export default function Inputbox({ Class, Title, Type, Value, Name, MinLength, MinDate, MaxDate, AutoFocus, Disabled, Required, InCol, InWhite }) {
    function ValidType( type ) {
        const allowedTypes = ['text', 'email', 'date', 'password', 'datetime-local', 'month', 'url', 'number', 'time'];
        return allowedTypes.includes( type ) ? type : 'text';
    }

    return(
        <label className={ `inputbox ${ InCol ? 'incol' : undefined } ${ InWhite ? 'inwhite' : undefined } ${ Class }` }>
            <h4>{ Title }:</h4>
            <input 
            type={ ValidType(Type) } 
            value={ Value } 
            name={ Name } 
            minLength={ MinLength } 
            min={ MinDate } 
            max={ MaxDate } 
            autoFocus={ AutoFocus } 
            disabled={ Disabled } 
            required={ Required } />
        </label>
    )
}