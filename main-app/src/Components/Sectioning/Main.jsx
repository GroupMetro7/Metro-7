import React from 'react'
import '../../Assets/css/components/main.sass'

export default function Main({ children, ID, Class, Row }) {
    return(
        <main id={ ID } className={`${ Class }`}>
            <div className={ Row && 'row' }>
                { children }
            </div>
        </main>
    )
}
