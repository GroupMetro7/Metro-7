import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/components/href.sass'

export default function Href({ Class, Title, Icon, Redirect, Onclick, OpenModal, CloseModal, DropDown, HrefWhite, redirect }) {
    return(
        OpenModal || CloseModal || DropDown ? (
            <a className={ `${HrefWhite ? 'hrefwhite' : null} ${Class}` }
                onClick={ Onclick }
                data-bs-toggle={ OpenModal ? 'modal' : DropDown ? 'dropdown' : null }
                data-bs-target={ OpenModal ? '#Modal' : null }
                data-bs-dismiss={ CloseModal ? 'modal' : null }>
                { Icon && <div><img src={ Icon }/></div> }
                { Title }
            </a>
        )
        : (
            <Link className={ `${HrefWhite ? 'hrefwhite' : null} ${Class}` }
                to={ Redirect }>
                { Icon ? <div><img src={ Icon }/></div> : null }
                { Title }
            </Link>
        )
    )
}
