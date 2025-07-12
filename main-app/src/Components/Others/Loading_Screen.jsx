import React from 'react'
import '../../assets/css/components/Loading_Screen.sass'
import { LoadingMLogo, Loading7Logo } from '../../Exporter/Public_Exporter'

export default function LoadingScreen() {

    return(
        <div className='loading'>
            <img src={ LoadingMLogo } alt="" />
            <img src={ Loading7Logo } alt="" />
        </div>
    )
}