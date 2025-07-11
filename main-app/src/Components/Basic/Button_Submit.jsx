import React from 'react'
import '../../assets/css/components/button.sass'

export default function SubmitButton({ ID, Class, Title, BtnWhite, OpenModal, CloseModal, disabled }) {
    return(
        <input type='submit' id={ ID } className={ `${BtnWhite && 'btnwhite' } ${Class}` }
            value={ Title }
            data-bs-target={ OpenModal && (`#${ OpenModal }`) }
            data-bs-toggle={ OpenModal && 'modal' }
            data-bs-dismiss={ CloseModal && 'modal' }
            disabled={disabled}
        />
    )
}
