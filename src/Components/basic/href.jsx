import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/components/href.sass'

export default function Href({ Class, Title, Icon, Redirect, OpenModal, CloseModal, DropDown, HrefWhite }) {
    return(
        OpenModal || CloseModal || DropDown ? (
            <a className={ `${HrefWhite ? 'hrefwhite' : undefined} ${Class}` }
                data-bs-toggle={ OpenModal ? 'modal' : DropDown ? 'dropdown' : undefined }
                data-bs-target={ OpenModal ? '#Modal' : undefined } 
                data-bs-dismiss={ CloseModal ? 'modal' : undefined }>
                { Icon ? <><img src={ Icon }/></> : undefined }
                { Title }
            </a>
        )
        : (
            <Link className={ `${HrefWhite ? 'hrefwhite' : undefined} ${Class}` }
                to={ Redirect }>
                { Icon ? <><img src={ Icon }/></> : undefined }
                { Title }
            </Link>
        )
    )
}