import React from 'react'
import '../../../assets/css/components/table.sass'
import { Button } from '../../../exporter/component_exporter'
import { ViewLogo, EditLogo, DeleteLogo } from '../../../exporter/public_exporter'

export default function TBData({ Title, DataRows, ViewBtn, EditBtn, DeleteBtn }) {
    return (
        <>
            {DataRows.map((DataRow, RowIndex) => (
                <div className="td" key={RowIndex}>
                    {/* Dynamically render all properties of the row except actions */}
                    {Object.keys(DataRow).map((key, CellIndex) => {
                        if (key !== 'edit' && key !== 'delete' && key !== 'view') {
                            return (
                                <div className="tc" key={CellIndex}>
                                    <h4>{DataRow[key]}</h4>
                                </div>
                            );
                        }
                    })}

                    {/* Render action buttons if enabled */}
                    { ( ViewBtn || EditBtn || DeleteBtn ) && 
                        <div className="tc tcbtn">
                            {ViewBtn && DataRow.view && (
                                <Button Icon={ViewLogo} OpenModal={ Title ? `ViewModal-${ Title }` : 'ViewModal' } Onclick={DataRow.view} />
                            )}
                            { EditBtn && DataRow.edit && (
                                <Button Icon={EditLogo} OpenModal={ Title ? `EditModal-${ Title }` : 'EditModal' } Onclick={DataRow.edit} />
                            )}
                            { DeleteBtn && DataRow.delete && (
                                <Button Icon={DeleteLogo} OpenModal={ Title ? `DeleteModal-${Title}` : 'DeleteModal' } Onclick={DataRow.delete} />
                            )}
                        </div>
                    }
                </div>
            ))}
        </>
    );
}
