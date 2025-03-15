import React from 'react'
import '../../Static/css/Components/BUTTON.sass'

export default function SubmitButton({ name, formBtn }) {
    return(
        <input type="submit" value={ name } class={ formBtn ? 'formBtn' : '' }/>
    )
}