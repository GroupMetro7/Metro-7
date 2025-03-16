import React from 'react'
import '../../../assets/css/components/table.sass'
import { TBHead, TBData } from '../../../exporter/component_exporter'

export default function Table({ HeadRows, DataRows, ViewBtn, EditBtn, Deletebtn }) {
    return(
        <div className='tb'>
            <TBHead HeadRows={ HeadRows } ViewBtn={ ViewBtn } EditBtn={ EditBtn } Deletebtn={ Deletebtn }/>
            <TBData DataRows={ DataRows } ViewBtn={ ViewBtn } EditBtn={ EditBtn } Deletebtn={ Deletebtn }/>
        </div>
    )
}