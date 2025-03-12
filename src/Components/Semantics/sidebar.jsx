import React from 'react'
import '../../Static/css/Components/SIDEBAR.sass'
import { Href } from '../components_exporter'
import { M7LOGO, DASHBOARDLOGO, ORDERLISTLOGO, PROFILELOGO, SALESLOGO, INVENTORYLOGO, EMPLOYEELOGO, CUSTOMERLOGO } from '../../Static/public_exporter'

export default function Sidebar({ CashierMode, AdminMode }) {
    return(
        <>
        <aside class="sidebar">
            <section>
                <div class="titleside"><img src={ M7LOGO }/></div>
                <nav>
                    { CashierMode ? (
                        <>
                            <Href name={ <img src={ DASHBOARDLOGO }/> } navigatation="/servicedashboard"></Href>
                            <Href name={ <img src={ ORDERLISTLOGO }/> } navigatation="/orderlist"></Href>
                            <Href name={ <img src={ PROFILELOGO }/> } navigatation="/serviceprofile"></Href>
                        </>
                    ) : undefined }
                    { AdminMode ? (
                        <>
                            <Href name={ <img src={ DASHBOARDLOGO }/> } navigatation="/servicedashboard"></Href>
                            <Href name={ <img src={ SALESLOGO }/> } navigatation="/orderlist"></Href>
                            <Href name={ <img src={ INVENTORYLOGO }/> } navigatation="/serviceprofile"></Href>
                            <Href name={ <img src={ EMPLOYEELOGO }/> } navigatation="/serviceprofile"></Href>
                            <Href name={ <img src={ CUSTOMERLOGO }/> } navigatation="/serviceprofile"></Href>
                        </>
                    ) : undefined }
                </nav>
            </section>
        </aside>
        </>
    )
}