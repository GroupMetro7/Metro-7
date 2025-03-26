import React from 'react'
import '../../../assets/css/components/table.sass'
import { Button } from '../../../exporter/component_exporter'
import { ViewLogo, EditLogo, DeleteLogo } from '../../../exporter/public_exporter'

export default function TBData({ DataRows, ViewBtn, EditBtn, Deletebtn }) {

    return (
        <>
            {DataRows.map((DataRow, RowIndex) => (
            <div className="td">
                    <div className='tc' key={ RowIndex+1 }>
                        <h4>{DataRow.first}</h4>
                    </div>
                    <div className='tc' key={ RowIndex+1 }>
                        <h4>{DataRow.second}</h4>
                    </div>
                    <div className='tc' key={ RowIndex+1 }>
                        <h4>{DataRow.third}</h4>
                    </div>
                    <div className='tc' key={ RowIndex+1 }>
                        <h4>{DataRow.fourth}</h4>
                    </div>
                    <div className='tc' key={ RowIndex+1 }>
                        <h4>{DataRow.fifth}</h4>
                    </div>
                    <div className='tc' key={ RowIndex+1 }>
                        <h4>{DataRow.sixth}</h4>
                    </div>
                    <div className='tc' key={ RowIndex+1 }>
                        <h4>{DataRow.seventh}</h4>
                    </div>
                    <div className='tc' key={ RowIndex+1 }>
                        <h4>{DataRow.lastUpdated}</h4>
                    </div>
                    <div className="tc tcbtn">
                        { ViewBtn ? <Button Icon={ViewLogo} key={RowIndex + 1} /> : null }
                        { EditBtn ? (
                            <Button
                                Icon={EditLogo}
                                OpenModal="EditModal"
                                Onclick={DataRow.edit}
                            />
                        ) : null }
                        { Deletebtn ? (
                            <Button
                                Icon={DeleteLogo}
                                OpenModal="DeleteModal"
                                Onclick={DataRow.delete}
                            />
                        ) : null }
                </div>
            </div>
            ))}
        </>
    );
}
