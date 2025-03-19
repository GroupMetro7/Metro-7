import React from 'react'
import '../../../assets/css/components/table.sass'

export default function TBHead({ HeadRows, ViewBtn, EditBtn, Deletebtn }) {
    return(
        <div className='thr'>
            { HeadRows.map(( HeadRow ) => (
                <div className='th'>
                    <h3>{ HeadRow }</h3>
                </div>
            ))}
            <div className='th thbtn'>
                { ViewBtn ? <div></div> : undefined }
                { EditBtn ? <div></div> : undefined }
                { Deletebtn ? <div></div> : undefined }
            </div>
        </div>
    )
}