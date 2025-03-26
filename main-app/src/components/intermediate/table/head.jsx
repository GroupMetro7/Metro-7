import React from 'react'
import '../../../assets/css/components/table.sass'

export default function TBHead({ HeadRows, ViewBtn, EditBtn, Deletebtn }) {
    return (
        <div className='th'>
            {HeadRows.map((HeadRow, index) => (
                <div key={index} className='tc'>
                    <h3>{HeadRow}</h3>
                </div>
            ))}
            <div className='tc tcbtn'>
                { ViewBtn ? <div></div> : null }
                { EditBtn ? <div></div> : null }
                { Deletebtn ? <div></div> : null }
            </div>
        </div>
    );
}
