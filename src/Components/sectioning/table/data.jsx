import React from 'react'
import '../../../assets/css/components/table.sass'
import { Button } from '../../../exporter/component_exporter'
import { ViewLogo, EditLogo, DeleteLogo } from '../../../exporter/public_exporter'

export default function TBData({ DataRows, ViewBtn, EditBtn, Deletebtn }) {
    return(
        <div className='tdr'>
            { DataRows.map(( DataRow, key ) => (<>
            <div>
                { DataRow.map(( DataCell, index ) => (
                <div className={`td ${ index === 4 ? `status ${ DataCell.toLowerCase() }` : undefined }`} key={index}>
                    <h4>{ DataCell }</h4>
                </div>
                ))}
                <div className='td tdbtn'>
                    { ViewBtn ? <Button Icon={ ViewLogo } /> : undefined }
                    { EditBtn ? <Button Icon={ EditLogo } /> : undefined }
                    { Deletebtn ? <Button Icon={ DeleteLogo } /> : undefined }
                </div>
            </div>
            <hr />
            </>))}
        </div>
    )
}

// SPECIAL NOTES:
// Key Param is to retrieve the primary key of the single row.