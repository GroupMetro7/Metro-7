import React from 'react'
import '../../assets/css/components/kpi.sass'

export default function KPI({ Class, Title, Item, Integer, Increase, Decrease }) {

    return(
        <div className={ `kpi ${ Class }` }>
            <h3>{ Title }</h3>
            { Item && <h4>{ Item }</h4> }
            { Integer && <h4>{ Integer }</h4> }
            { Increase && <p className="add">+{ Increase }</p> }
            { Decrease && <p>-{ Decrease }</p> }
        </div>
    )
}