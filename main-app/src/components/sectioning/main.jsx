import React from 'react'
import '../../Assets/css/components/main.sass'

export default function Main({ children, Class, Row }) {
    return(
        <main className={`${ Class }`}>
            <div className={ Row ? 'row' : undefined }>
                { children }
            </div>
        </main>
    )
}
