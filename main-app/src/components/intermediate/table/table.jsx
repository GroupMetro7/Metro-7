import React from 'react'
import '../../../assets/css/components/table.sass'
import { TBHead, TBData } from '../../../exporter/component_exporter'

export default function Table({ Title, Class, HeadRows, DataRows, ViewBtn, EditBtn, DeleteBtn, CancelBtn }) {

    return(
        <>
        <div className={`tb ${ Class }`}>
            { DataRows != 0 ?  
                <>
                <TBHead HeadRows={ HeadRows } ViewBtn={ ViewBtn } EditBtn={ EditBtn } DeleteBtn={ DeleteBtn } CancelBtn={ CancelBtn } />
                <hr />
                <TBData Title={ Title } DataRows={ DataRows } ViewBtn={ ViewBtn } EditBtn={ EditBtn } DeleteBtn={ DeleteBtn } CancelBtn={ CancelBtn } />
                </>
                :
                <>
                <h3>No Data Available</h3>
                </>
            }
        </div>
        </>
    )
}
