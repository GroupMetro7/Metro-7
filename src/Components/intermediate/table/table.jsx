import React from 'react'
import '../../../assets/css/components/table.sass'
import { TBHead, TBData, Button, Pagination } from '../../../exporter/component_exporter'

export default function Table({ Class, HeadRows, DataRows, ViewBtn, EditBtn, Deletebtn, Paginate }) {

    return(
        <>
        <div className={`tb ${ Class }`}>
            <TBHead HeadRows={ HeadRows } ViewBtn={ ViewBtn } EditBtn={ EditBtn } Deletebtn={ Deletebtn }/>
            <TBData DataRows={ DataRows } ViewBtn={ ViewBtn } EditBtn={ EditBtn } Deletebtn={ Deletebtn }/>
        </div>
        { Paginate ? <Pagination Item={ Paginate } /> : undefined }
        </>
    )
}
