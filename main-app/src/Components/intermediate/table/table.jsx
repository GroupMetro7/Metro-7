import React from 'react'
import '../../../assets/css/components/table.sass'
import { TBHead, TBData } from '../../../exporter/component_exporter'

export default function Table({ Title, Class, HeadRows, DataRows, ViewBtn, EditBtn, DeleteBtn }) {

    return(
        <>
        <div className={`tb ${ Class }`}>
            <TBHead HeadRows={ HeadRows } ViewBtn={ ViewBtn } EditBtn={ EditBtn } DeleteBtn={ DeleteBtn } />
            <hr />
            <TBData Title={ Title } DataRows={ DataRows } ViewBtn={ ViewBtn } EditBtn={ EditBtn } DeleteBtn={ DeleteBtn }/>
        </div>
        </>
    )
}
