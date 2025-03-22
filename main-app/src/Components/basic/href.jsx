import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/components/href.sass'

export default function Href({ Class, Title, Icon, Redirect, OpenModal, CloseModal, HrefWhite, onClick }) {
    return(
        OpenModal || CloseModal ? (
            <a className={ `${HrefWhite ? 'hrefwhite' : undefined} ${Class}` }
                data-bs-target={ OpenModal ? '#Modal' : undefined }
                data-bs-toggle={ OpenModal ? 'modal' : undefined }
                data-bs-dismiss={ CloseModal ? 'modal' : undefined }>
                { Icon ? <><img src={ Icon }/></> : undefined }
                { Title } { onClick }
            </a>
        )
        : (
            <Link className={ `${HrefWhite ? 'hrefwhite' : undefined} ${Class}` }
                to={ Redirect }>
                { Icon ? <><img src={ Icon }/></> : undefined }
                { Title } { onClick }
            </Link>
        )
    )
}
