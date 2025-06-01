import React from 'react'
import '../../assets/css/components/inputbox & selectbox.sass'

export default function Selectionbox({ Class, Title, Options, Value, Name, Multiple, AutoFocus, Disabled, Required, SltCol, SltWhite, OnChange }) {

    return(
        <label className={ `selectionbox ${ SltCol && 'sltcol' } ${ SltWhite && 'sltwhite' } ${ Class }` }>
            { Title && <h4>{ Title }:</h4> }
            <select
            value={ Value }
            name={ Name }
            multiple={ Multiple }
            autoFocus={ AutoFocus }
            disabled={ Disabled }
            required={ Required }
            onChange={ OnChange }>
            <option hidden value="">Options</option>
            { Options ? Options.map((option, idx) =>
                typeof option === 'object'
                    ? <option key={option.value ?? idx} value={option.value}>{option.label}</option>
                    : <option key={option} value={option}>{option}</option>
            ) : null }
            </select>
        </label>
    )
}
