import React from 'react'
import '../../Static/css/Components/BUTTON_FILE.sass'

export default function InsertfileButton({ name }) {
    return(
        <label class="btnfile">
            <input type="file"/>
            <h3>{ name }</h3>
        </label>
    )
}