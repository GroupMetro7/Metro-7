import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/components/button.sass'

export default function Button({ Class, Title, Icon, Key, Redirect, Pagination, OpenModal, CloseModal, BtnWhite, Onclick, Disabled }) {
    const navigate = useNavigate();

    return(
        <button type='button' className={ `${ BtnWhite && 'btnwhite' } ${ Class }` }
            onClick={(e) => {
            Onclick && Onclick(e) ||
            Redirect && navigate(`${Redirect}`) ||
            Pagination && handlePageChange(Pagination)
            }}
            disabled = {Disabled}
            data-bs-target={ OpenModal && (`#${ OpenModal }`) }
            data-bs-toggle={ OpenModal && 'modal' }
            data-bs-dismiss={ CloseModal && 'modal' }
            key={ Key }
            >
            { Icon && <><img src={ Icon }/></> }
            { Title }
        </button>
    )
}
