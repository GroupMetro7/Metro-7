import React from 'react'
import '../../../assets/css/components/table.sass'
import { TBHead, TBData, Button, Pagination } from '../../../exporter/component_exporter'

export default function Table({ Class, HeadRows, DataRows, ViewBtn, EditBtn, Deletebtn, Columns}) {

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
