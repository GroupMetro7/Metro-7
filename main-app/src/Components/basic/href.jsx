import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/components/href.sass'

export default function Href({ Class, Title, Icon, Redirect, Onclick, OpenModal, CloseModal, DropDown, HrefWhite }) {
    return(
        OpenModal || CloseModal || DropDown ? (
            <a className={ `${HrefWhite ? 'hrefwhite' : null} ${Class}` }
                onClick={ Onclick ? () => Onclick : null }
                data-bs-toggle={ OpenModal ? 'modal' : DropDown ? 'dropdown' : null }
                data-bs-target={ OpenModal ? '#Modal' : null }
                data-bs-dismiss={ CloseModal ? 'modal' : null }>
                { Icon ? <><img src={ Icon }/></> : null }
                { Title }
            </a>
        )
        : (
            <Link className={ `${HrefWhite ? 'hrefwhite' : null} ${Class}` }
                to={ Redirect }>
                { Icon ? <><img src={ Icon }/></> : null }
                { Title }
            </Link>
        )
    )
}
