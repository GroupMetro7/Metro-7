import React from 'react'
import '../../assets/css/components/inputbox & selectbox.sass'

export default function Inputbox({ ID, Class, Title, Type, Value, Name, MinLength, MinDate, MaxDate, AutoFocus, Disabled, Required, InCol, InWhite, onChange, accept, Placeholder }) {
    function ValidType( type ) {
        const allowedTypes = ['text', 'email', 'date', 'password', 'datetime-local', 'month', 'url', 'number', 'time', 'file', 'search'];
        return allowedTypes.includes( type ) && type;
    }

    return(
        <label className={ `inputbox ${ InCol && 'incol' } ${ InWhite && 'inwhite' } ${Class}` }>
            { Title && <h4>{ Title }:</h4> }
            <input
            id={ ID }
            type={ ValidType(Type) }
            value={ Value }
            name={ Name }
            minLength={ MinLength }
            min={ MinDate }
            max={ MaxDate }
            autoFocus={ AutoFocus }
            disabled={ Disabled }
            onChange={ onChange }
            required={ Required }
            accept={ accept }
            placeholder={Placeholder}
            />
        </label>
    )
}
