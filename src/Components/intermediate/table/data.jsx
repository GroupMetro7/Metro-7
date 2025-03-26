import React from 'react'
import '../../../assets/css/components/table.sass'
import { Button } from '../../../exporter/component_exporter'
import { ViewLogo, EditLogo, DeleteLogo } from '../../../exporter/public_exporter'

export default function TBData({ DataRows, ViewBtn, EditBtn, Deletebtn }) {
    return(
        <>
            { DataRows.map(( DataRow, RowIndex ) => (<>
            <form className='td'> {/* You can modify this from div to form */}
                { DataRow.map(( DataCell, CellIndex ) => (
                <div className='tc' key={ RowIndex+1 }>
                    <h4>{ DataCell }</h4>
                </div>
                ))}
                { ViewBtn || EditBtn || Deletebtn ?
                    <div className='tc tcbtn'>
                        {ViewBtn ? <Button Icon={ViewLogo} Key={RowIndex + 1} OpenModal='ViewModal' /> : undefined}
                        {EditBtn ? <Button Icon={EditLogo} Key={RowIndex + 1} OpenModal='EditModal' /> : undefined}
                        {Deletebtn ? <Button Icon={DeleteLogo} Key={RowIndex + 1} OpenModal='DeleteModal' /> : undefined}
                    </div>
                    :
                    undefined
                }
            </form>
            </>))}
        </>
    )
}

// SPECIAL NOTES:
// Key Param is to retrieve the primary key of the single row.