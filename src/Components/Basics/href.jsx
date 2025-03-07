import React from 'react'
import { Link } from 'react-router-dom'
import '../../Static/css/Components/HREF.sass'

export default function Href({ name, navigatation }) {
    return(
        <Link to={ navigatation }>{ name }</Link>
    )
}