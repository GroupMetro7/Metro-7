import React from 'react'
import '../../assets/css/components/button.sass'

export default function SubmitButton({ Class, Title, BtnWhite }) {
    return(
        <input type='submit' 
            className={ `${BtnWhite ? 'btnwhite' : undefined} ${Class}` }
            value={ Title } 
        />
    )
}