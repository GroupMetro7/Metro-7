import React from 'react'
import '../../../Assets/CSS/Components/Table.sass'

export default function TBHead({ HeadRows, ViewBtn, EditBtn, DeleteBtn, CancelBtn }) {
    return (
        <div className="th">
            {Object.values(HeadRows).map((label, index) => (
                <div key={index} className="tc">
                    <h3>{label}</h3>
                </div>
            ))}
            {(ViewBtn || EditBtn || DeleteBtn || CancelBtn) && (
                <div className="tc tcbtn">
                    {ViewBtn && <div></div>}
                    {EditBtn && <div></div>}
                    {DeleteBtn ? <div></div> : CancelBtn && <div></div>}
                </div>
            )}
        </div>
    );
}
