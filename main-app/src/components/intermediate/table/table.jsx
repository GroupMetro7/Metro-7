import React from 'react'
import '../../../assets/css/components/table.sass'
import { TBHead, TBData } from '../../../exporter/component_exporter'

export default function Table({ Class, HeadRows, DataRows, ViewBtn, EditBtn, Deletebtn}) {

    return(
        <>
        <div className={`tb ${ Class }`}>
            <TBHead HeadRows={ HeadRows } />
            <hr />
            <TBData DataRows={ DataRows } ViewBtn={ ViewBtn } EditBtn={ EditBtn } Deletebtn={ Deletebtn }/>
        </div>
        </>
    )
}
