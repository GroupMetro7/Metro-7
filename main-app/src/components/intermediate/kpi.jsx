import React from 'react'
import '../../assets/css/components/kpi.sass'

export default function KPI({ Class, Title, Item, Integer, Increase, Decrease }) {

    return(
        <div className={ `kpi ${ Class }` }>
            <h3>{ Title }</h3>
            { Item ? <h4>{ Item }</h4> : undefined }
            { Integer ? <h4>{ Integer }</h4> : undefined }
            { Increase ? <p className="add">+{ Increase }</p> : undefined }
            { Decrease ? <p>-{ Decrease }</p> : undefined }
        </div>
    )
}