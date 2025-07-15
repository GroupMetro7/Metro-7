import React from 'react'
import '../../Assets/CSS/Components/KPI.sass'

export default function KPI({ Class, Title, Item, Integer, Increase, Decrease }) {

    return(
        <div className={ `kpi ${ Class }` }>
            <h4>{ Title }</h4>
            { Item && <h5>{ Item }</h5> }
            { Integer && <h5>{ Integer }</h5> }
            { Increase && <p className={`add`}>+{ Increase }</p> }
            { Decrease && <p>-{ Decrease }</p> }
        </div>
    )
}