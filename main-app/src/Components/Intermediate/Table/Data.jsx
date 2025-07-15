import React from 'react'
import '../../../Assets/CSS/Components/Table.sass'
import { Button } from '../../../Exporter/Component_Exporter'
import { ViewLogo, EditLogo, DeleteLogo, CancelLogo } from '../../../Exporter/Public_Exporter'

export default function TBData({ Title, DataRows, ViewBtn, EditBtn, DeleteBtn, CancelBtn }) {
    return (
        <>
            {DataRows.map((DataRow, RowIndex) => (
                <div className={`td`} key={RowIndex}>
                    {/* Dynamically render all properties of the row except actions */}
                    {Object.keys(DataRow).map((key, CellIndex) => {
                        if (key !== `edit` && key !== `delete` && key !== `view` && key !== `cancel`) {
                            return (
                                <div className={`tc`} key={CellIndex}>
                                    <h4>{DataRow[key]}</h4>
                                </div>
                            );
                        }
                    })}

                    {/* Render action buttons if enabled */}
                    { ( ViewBtn || EditBtn || DeleteBtn || CancelBtn ) && 
                        <div className={`tc tcbtn`}>
                            {ViewBtn && DataRow.view && 
                                <Button Icon={ViewLogo} OpenModal={ Title ? `${Title}-view-modal` : `view-modal` } Onclick={DataRow.view} />
                            }
                            { EditBtn && DataRow.edit && 
                                <Button Icon={EditLogo} OpenModal={ Title ? `${Title}-edit-modal` : `edit-modal` } Onclick={DataRow.edit} />
                            }
                            { DeleteBtn && DataRow.delete && 
                                <Button Icon={DeleteLogo} OpenModal={ Title ? `${Title}-delete-modal` : `delete-modal` } Onclick={DataRow.delete} />
                            }
                            { CancelBtn && 
                                <Button Icon={CancelLogo} OpenModal={ Title ? `${Title}-cancel-modal` : `cancel-modal` } Onclick={DataRow.cancel} />
                            }
                        </div>
                    }
                </div>
            ))}
        </>
    );
}
