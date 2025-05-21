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
            { ( ViewBtn || EditBtn || Deletebtn ) && 
                <div className='tc tcbtn'>
                    { ViewBtn ? <div></div> : undefined }
                    { EditBtn ? <div></div> : undefined }
                    { Deletebtn ? <div></div> : undefined }
                </div>
            }
        </div>
    );
}
