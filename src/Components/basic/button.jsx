import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/components/button.sass'

export default function Button({ Class, Title, Icon, Redirect, OpenModal, CloseModal, BtnWhite }) {
    const navigate = useNavigate();
    return(
        <button type='button' 
            className={ `${ BtnWhite ? 'btnwhite' : undefined } ${ Class }` }
            onClick={ Redirect ? () => navigate(`${ Redirect }`) : undefined } 
            data-bs-target={ OpenModal ? '#Modal' : undefined } 
            data-bs-toggle={ OpenModal ? 'modal' : undefined } 
            data-bs-dismiss={ CloseModal ? 'modal' : undefined } >
            { Icon ? <><img src={ Icon }/></> : undefined }
            { Title }
        </button>
    )
}