import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Button({ label, navigatation }) {
    const navigate = useNavigate();
    return(
        <button onClick={() => navigate(`${navigatation}`)}>{ label }</button>
    )
}

