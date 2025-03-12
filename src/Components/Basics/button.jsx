import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../Static/css/Components/BUTTON.sass'

export default function Button({ name, navigatation, redirect, openmodal, closemodal, formBtn, pagination }) {
    const navigate = useNavigate();
    return(
        <button type="button" onClick={ redirect ? () => navigate(`${navigatation}`) : undefined } data-bs-target={ openmodal ? '#Modal' : undefined } data-bs-toggle={ openmodal ? 'modal' : undefined } data-bs-dismiss={ closemodal ? 'modal' : undefined } class={`${formBtn ? 'formBtn' : ''}${pagination ? 'pagination' : '' }`}>{ name }</button>
    )
}

