import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/components/href.sass'

export default function Href({ Class, Title, Icon, Redirect, Onclick, OpenModal, CloseModal, DropDown, HrefWhite, Scroll, Logout }) {
    return(
        Redirect ? (
            <Link className={ `${HrefWhite && 'hrefwhite' } ${Class}` }
                to={ Redirect }>
                { Icon && <div><img src={ Icon }/></div> }
                { Title }
            </Link>
        )
        : (
            <a className={ `${HrefWhite && 'hrefwhite' } ${Class}` }
                href={ `#${ Scroll }` }
                onClick={ Onclick }
                data-bs-toggle={ OpenModal && 'modal' || DropDown && 'dropdown' }
                data-bs-target={ OpenModal && '#Modal' }
                data-bs-dismiss={ CloseModal && 'modal' }>
                { Icon && <div><img src={ Icon }/></div> }
                { Title }
            </a>
        )
    )
}
