import React from 'react'
import '../../Static/css/Components/RADIO.sass'

export default function Radio({ name, radioname }) {
    return(
        <label>
            <input type="radio" name={ radioname } value={ name }/>
            <div>
                <h3>{ name }</h3>
            </div>
        </label>
    )
}