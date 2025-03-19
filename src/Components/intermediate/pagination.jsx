import React from 'react'
import '../../assets/css/components/pagination.sass'
import { Button } from '../../exporter/component_exporter'

export default function Pagination({ Class, Item }) {

    return(
        <div className={ `pagination ${ Class }` }>
            { Item ? (
                (() => {
                    let item = [];
                    for (let i = 1; i <= Item; i++) {
                        item.push(<Button Title={ i } Key={ i } Pagination={ i } />);
                    }
                    return item;
                })()
            ) : (
                undefined
            )}
        </div>
    )
}