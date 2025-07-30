import React from 'react'
import { Link } from 'react-router-dom'
import '../../Assets/CSS/Components/Href.sass'

export default function Href({ ID, Class, Title, Icon, Redirect, Onclick, OpenModal, CloseModal, DropDown, Scroll, IconBadge, HrefWhite }) {
    return(
        Redirect ? 
            <Link id={ ID } className={ `${HrefWhite && `hrefwhite` } ${Class}` }
                to={ Redirect }>
                { Icon && <div><img src={ Icon }/>{ IconBadge && <div className={`badge`}>{ IconBadge }</div>}</div> }
                { Title }
            </Link>
        : 
            <a id={ ID } className={ `${HrefWhite && `hrefwhite` } ${Class}` }
                href={ `#${ Scroll }` }
                onClick={ Onclick }
                data-bs-toggle={ OpenModal && `modal` || DropDown && `dropdown` }
                data-bs-target={ OpenModal && `#Modal` }
                data-bs-dismiss={ CloseModal && `modal` }>
                { Icon && <div><img src={ Icon }/></div> }
                { Title }
            </a>
    )
}
