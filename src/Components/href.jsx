import React from 'react'
import { Link } from 'react-router-dom'
import '../Static/css/Components/HREF.sass'

export default function Href({ label, navigatation }) {
    return(
        <Link to={ navigatation }>{ label }</Link>
    )
}