import React from 'react'
import '../../assets/css/components/section.sass'

export default function Section({ children, Class, Title, UpperLeft, UpperRight }) {
    return(
        <section className={ Class }>
            { UpperLeft || UpperRight ? (
                <div className="title">
                    { UpperLeft ? <div className="left">{ UpperLeft }</div> : <div className="left"></div> }
                    <h1>{ Title }</h1>
                    { UpperRight ? <div className="right">{ UpperRight }</div> : <div className="right"></div> }
                </div>
            ) : (
                Title ? <h1>{ Title }</h1> : undefined
            )}
            { children }
        </section>
    )
}
