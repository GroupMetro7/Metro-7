import React from 'react'
import '../../Assets/CSS/Components/Button.sass'

export default function SubmitButton({ ID, Class, Title, BtnWhite, OpenModal, CloseModal, Disabled, Onclick }) {
    return(
        <input type={'submit'} id={ ID } className={ `${BtnWhite && 'btnwhite' } ${Class}` }
            value={ Title }
            data-bs-target={ OpenModal && (`#${ OpenModal }`) }
            data-bs-toggle={ OpenModal && 'modal' }
            data-bs-dismiss={ CloseModal && 'modal' }
            disabled={Disabled}
            onClick={Onclick}
        />
    )
}
