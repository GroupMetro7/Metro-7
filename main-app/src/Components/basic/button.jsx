import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../assets/css/components/button.sass'

export default function Button({ Class, Title, Icon, Key, Redirect, Pagination, OpenModal, CloseModal, BtnWhite, Onclick, Disabled }) {
    const navigate = useNavigate();

    return(
        <button type='button'
            className={ `${ BtnWhite ? 'btnwhite' : undefined } ${ Class }` }
        onClick={(e) => {
          if ( Onclick ) Onclick(e);
          if ( Redirect ) navigate(`${Redirect}`);
          if ( Pagination ) handlePageChange(Pagination);
        }}
        disabled = {Disabled}
            data-bs-target={ OpenModal ? (`#${ OpenModal }`) : undefined }
            data-bs-toggle={ OpenModal ? 'modal' : undefined }
            data-bs-dismiss={ CloseModal ? 'modal' : undefined }
            key={ Key } >
            { Icon ? <><img src={ Icon }/></> : undefined }
            { Title }

        </button>
    )
}
