import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/components/button.sass'

export default function Button({ Class, Title, Icon, Key, Redirect, Pagination, Onclick, OpenModal, CloseModal, DropDown, BtnWhite }) {
    const navigate = useNavigate();

    return(
        <button type='button'
            className={ `${ BtnWhite ? 'btnwhite' : null } ${ Class }` }
            onClick={ Onclick ? () => Onclick : Redirect ? () => navigate(`${Redirect}`) : Pagination ? () => handlePageChange(Pagination) : null }
            data-bs-toggle={ OpenModal ? 'modal' : DropDown ? 'dropdown' : null } 
            data-bs-target={ OpenModal ? (`#${ OpenModal }`) : null } 
            data-bs-dismiss={ CloseModal ? 'modal' : null }
            key={ Key } >
            { Icon ? <><img src={ Icon }/></> : null }
            { Title }
        </button>
    )
}
