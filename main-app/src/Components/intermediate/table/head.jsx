import React from 'react'
import '../../../assets/css/components/table.sass'

export default function TBHead({ HeadRows, ViewBtn, EditBtn, DeleteBtn, CancelBtn }) {
    return (
        <div className='th'>
            {HeadRows.map((HeadRow, index) => (
                <div key={index} className='tc'>
                    <h3>{HeadRow}</h3>
                </div>
            ))}
            { ( ViewBtn || EditBtn || DeleteBtn || CancelBtn ) && 
                <div className='tc tcbtn'>
                    { ViewBtn && <div></div> }
                    { EditBtn && <div></div> }
                    { DeleteBtn && <div></div> ||
                    CancelBtn && <div></div> }
                </div>
            }
        </div>
    );
}
