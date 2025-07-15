import React from 'react'
import '../../Assets/CSS/Components/Section.sass'

export default function Section({ children, ID, Class, Title, UpperLeft, UpperRight }) {
    return(
        <section id={ ID } className={ Class }>
            { UpperLeft || UpperRight ? 
                <div className={`title`}>
                    <div className={`left`}>{ UpperLeft && UpperLeft }</div>
                    <h1>{ Title }</h1>
                    <div className={`right`}>{ UpperRight && UpperRight }</div>
                </div>
            : 
                Title && <h1>{ Title }</h1> 
            }
            { children }
        </section>
    )
}
