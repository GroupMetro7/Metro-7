import React from 'react'
import '../../../assets/css/components/table.sass'
import { Button } from '../../../exporter/component_exporter'
import { ViewLogo, EditLogo, DeleteLogo } from '../../../exporter/public_exporter'

export default function TBData({ DataRows, ViewBtn, EditBtn, Deletebtn }) {

    return (
        <div className="tdr">
            {DataRows.map((DataRow, RowIndex) => (
                <div key={RowIndex} className="tr">
                    <h4 className="td">{DataRow.first}</h4>
                    <h4 className="td">{DataRow.second}</h4>
                    <h4 className="td">{DataRow.third}</h4>
                    <h4 className="td">{DataRow.fourth}</h4>
                    <h4 className="td">{DataRow.fifth}</h4>
                    <h4 className="td">{DataRow.sixth}</h4>
                    <h4 className="td">{DataRow.seventh}</h4>
                    <h4 className="td">{DataRow.lastUpdated}</h4>
                    <div className="td tdbtn">
                        {ViewBtn ? <Button Icon={ViewLogo} key={RowIndex + 1} /> : null}
                        {EditBtn ? (
                            <Button
                                Icon={EditLogo}
                                OpenModal="EditModal"
                                Onclick={DataRow.edit}
                            />
                        ) : null}
                        {Deletebtn ? (
                            <Button
                                Icon={DeleteLogo}
                                OpenModal="DeleteModal"
                                Onclick={DataRow.delete}
                            />
                        ) : null}
                    </div>
                </div>
            ))}
        </div>
    );
}
