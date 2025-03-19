import React from 'react'
import '../../../assets/css/components/table.sass'
import { Button } from '../../../exporter/component_exporter'
import { ViewLogo, EditLogo, DeleteLogo } from '../../../exporter/public_exporter'

export default function TBData({ DataRows, ViewBtn, EditBtn, Deletebtn }) {
    return(
        <div className='tdr'>
            { DataRows.map(( DataRow, RowIndex ) => (<>
            <div> {/* You can modify this from div to form */}
                { DataRow.map(( DataCell, CellIndex ) => (
                <div className='td' key={ RowIndex+1 }>
                    <h4>{ DataCell }</h4>
                </div>
                ))}
                <div className='td tdbtn'>
                    { ViewBtn ? <Button Icon={ ViewLogo } Key={ RowIndex+1 } /> : undefined }
                    { EditBtn ? <Button Icon={ EditLogo } Key={ RowIndex+1 } OpenModal="EditModal" /> : undefined }
                    { Deletebtn ? <Button Icon={ DeleteLogo } Key={ RowIndex+1 } OpenModal="DeleteModal" /> : undefined }
                </div>
            </div>
            <hr />
            </>))}
        </div>
    )
}

// SPECIAL NOTES:
// Key Param is to retrieve the primary key of the single row.