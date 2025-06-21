import React from 'react'
import '../../Assets/css/components/GMap.sass'

export default function GoogleMapEmbed() {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.202108445097!2d121.06146087469735!3d14.587556385897225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c8108995e2b9%3A0xb200123f27577ca1!2sMetrowalk%20Commercial%20Complex!5e0!3m2!1sen!2sph!4v1740727572135!5m2!1sen!2sph"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    )
}
