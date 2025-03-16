import React from 'react'
import '../../assets/css/components/section.sass'

export default function Section({ children, Class, Title }) {
    return(
        <section className={ Class }>
            { Title ? <h1>{ Title }</h1> : undefined}
            { children }
        </section>
    )
}