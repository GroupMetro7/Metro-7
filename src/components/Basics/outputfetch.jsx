import React from 'react'
import '../../Static/css/Components/OUTPUTFETCH.sass'

export default function Outputfetch({ name, value }) {
    return(
        <label>
            <h3>{ name }:</h3>
            <h2>{ value }</h2>
        </label>
    )
}