import React from 'react'
import '../../Static/css/Components/INPUTBOX.sass'

export default function Inputbox({ name, value, type, formIn }) {
    return(
        <label class={ formIn ? 'formIn' : '' }>
            <h3>{ name }:</h3>
            <input type={ type } value={ value }/>
        </label>
    )
}