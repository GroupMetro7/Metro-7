import React from 'react'
import '../../assets/css/components/box.sass'

export default function Box({ children, ID, Class, Title, UpperLeft, UpperRight, BoxCol, BoxWrap }) {
    return(
        <div id={ ID } className={`box ${ BoxCol && 'boxcol' } ${ BoxWrap && 'boxwrap' } ${ Class }`}>
            { UpperLeft || UpperRight ? 
                <div className="title">
                    { UpperLeft ? <div className="left">{ UpperLeft }</div> : <div className="left"></div> }
                    <h2>{ Title }</h2>
                    { UpperRight ? <div className="right">{ UpperRight }</div> : <div className="right"></div> }
                </div>
            :
                Title && <h2>{ Title }</h2>
            }
            { children }
        </div>
    )
}
