import React from 'react'
import '../Static/css/Components/INPUTBOX.sass'

export default function Inputbox({ label, type, value, colIn }) {
    return(
        <section class={ colIn ? "col-in" : "" }>
            <label>{ label }:</label>
            <input type={ type } value={ value }/>
        </section>
    )
}