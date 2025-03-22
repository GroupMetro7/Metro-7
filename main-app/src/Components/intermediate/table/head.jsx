import React from 'react';
import '../../../assets/css/components/table.sass';

export default function TBHead({ HeadRows }) {
    return (
        <div className='thr'>
            {HeadRows.map((HeadRow, index) => (
                <div key={index} className='th'>
                    <h3>{HeadRow}</h3>
                </div>
            ))}
            <div className='th'>
                <h3>Actions</h3>
            </div>
        </div>
    );
}
