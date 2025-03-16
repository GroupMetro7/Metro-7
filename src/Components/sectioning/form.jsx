import React from 'react'
import '../../assets/css/components/form.sass'

export default function Form({ children, Class, Title }) {
    return(
        <div className={`form ${ Class }`}>
            { Title ? <h1>{ Title }</h1> : undefined}
            <form>
                { children }
            </form>
        </div>
    )
}