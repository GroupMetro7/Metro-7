import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/components/button.sass'

export default function Button({ Class, Title, Icon, Key, Redirect, Pagination, Onclick, OpenModal, CloseModal, DropDown, BtnWhite }) {
    const navigate = useNavigate();

    return(
        <button type='button' 
            className={ `${ BtnWhite ? 'btnwhite' : undefined } ${ Class }` }
            onClick={ Onclick ? () => Onclick : Redirect ? () => navigate(`${Redirect}`) : Pagination ? () => handlePageChange(Pagination) : undefined }
            data-bs-toggle={ OpenModal ? 'modal' : DropDown ? 'dropdown' : undefined } 
            data-bs-target={ OpenModal ? (`#${ OpenModal }`) : undefined } 
            data-bs-dismiss={ CloseModal ? 'modal' : undefined }
            key={ Key } >
            { Icon ? <><img src={ Icon }/></> : undefined }
            { Title }
        </button>
    )
}