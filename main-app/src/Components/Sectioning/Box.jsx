import React from 'react'
import '../../Assets/CSS/Components/Box.sass'

export default function Box({ children, ID, Class, Title, UpperLeft, UpperRight, BoxCol, BoxWrap }) {
    return(
        <div id={ ID } className={`box ${ BoxCol && `boxcol` } ${ BoxWrap && `boxwrap` } ${ Class }`}>
            { UpperLeft || UpperRight ? 
                <div className={`title`}>
                    <div className={`left`}>{ UpperLeft && UpperLeft }</div>
                    <h2>{ Title }</h2>
                    <div className={`right`}>{ UpperRight && UpperRight }</div>
                </div>
            :
                Title && <h2>{ Title }</h2>
            }
            { children }
        </div>
    )
}
