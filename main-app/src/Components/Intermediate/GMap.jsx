import React from 'react'
import '../../Assets/CSS/Components/GMap.sass'

export default function GMap({ Link }) {
    return (
        <iframe
            src={Link}
            referrerPolicy={`no-referrer-when-downgrade`}
        />
    )
}