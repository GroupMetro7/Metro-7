import React from 'react'
import '../../assets/css/components/form.sass'

export default function Form({ children, Class, Title, OnSubmit, FormTwolayers, FormThreelayers }) {
    return(
        <div className={`form ${ Class }`}>
            { Title ? <h1>{ Title }</h1> : undefined}
            <form className={`${ FormTwolayers ? 'formtwolayers' : undefined } ${ FormThreelayers ? 'formthreelayers' : undefined }`} onSubmit={ OnSubmit }>
                { children }
            </form>
        </div>
    )
}