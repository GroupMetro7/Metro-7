import React from 'react'
import '../../assets/css/components/main.sass'

export default function Main({ children, Class, Row }) {
    return(
        <main className={`PCMOD-body ${ Class }`}>
            <div className={ Row ? 'row' : undefined }>
                { children }
            </div>
        </main>
    )
}
