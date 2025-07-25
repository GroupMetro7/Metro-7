import React from 'react'
import '../../Assets/CSS/Components/Form.sass'

export default function Form({ children, ID, Class, Title, OnSubmit, FormTwolayers, FormThreelayers }) {
    return(
        <div id={ ID } className={`form ${ Class }`}>
            { Title && <h1>{ Title }</h1> }
            <form className={`${ FormTwolayers && `formtwolayers` || FormThreelayers && `formthreelayers` }`} onSubmit={ OnSubmit }>
                { children }
            </form>
        </div>
    )
}