import React from 'react'
import '../../assets/css/components/main.sass'

export default function Main({ children, Class }) {
    return(
        <main className={`PCMOD-body ${ Class }`}>
            <div>
                { children }
            </div>
        </main>
    )
}