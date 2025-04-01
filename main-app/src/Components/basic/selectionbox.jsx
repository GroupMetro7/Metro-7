import React from 'react'
import '../../assets/css/components/inputbox & selectbox.sass'

export default function Selectionbox({ Class, Title, Options, Value, Name, Multiple, AutoFocus, Disabled, Required, SltCol, SltWhite }) {

    return(
        <label className={ `selectionbox ${ SltCol ? 'sltcol' : undefined } ${ SltWhite ? 'sltwhite' : undefined } ${ Class }` }>
            <h4>{ Title }:</h4>
            <select 
            value={ Value } 
            name={ Name } 
            multiple={ Multiple }
            autoFocus={ AutoFocus } 
            disabled={ Disabled } 
            required={ Required }>
            <option hidden></option>
            { Options ? <>{ Options.map(( option, index ) => (
                <option value={ index }>{ option }</option>
            ))}</> : undefined }
            </select>
        </label>
    )
}