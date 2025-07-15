import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../Assets/CSS/Components/Button.sass'

export default function Button({ ID, Class, Title, Icon, Key, Redirect, Navigate, Pagination, OpenModal, CloseModal, BtnWhite, Onclick, Disabled }) {
    const navigate = useNavigate();

    return(
        <button type={`button`} id={ID} className={`${BtnWhite && `btnwhite`} ${Class}`}
            onClick={(e) => {
                Onclick && Onclick(e) ||
                Redirect && navigate(`${Redirect}`) ||
                Navigate && (window.location.href = `${Navigate}`) ||
                Pagination && handlePageChange(Pagination)
            }}
            disabled={Disabled}
            data-bs-target={OpenModal && `#${OpenModal}`}
            data-bs-toggle={OpenModal && `modal`}
            data-bs-dismiss={CloseModal && `modal`}
            key={Key}
        >
            {Icon && <><img src={Icon} /></>}
            {Title}
        </button>
    )
}
