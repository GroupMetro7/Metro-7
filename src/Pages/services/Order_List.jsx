import React from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button } from '../../exporter/component_exporter'

export default function CustomerManagementPage() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    const user = 'Micheal Lance Kester Li'

    const tbhead = ['ORDER NO.', 'ORDER DATE', 'CUST. NAME', 'OPTIONS', 'AMOUNT', 'STATUS']
    const tbrowsOrders = [
        [<>25569</>, <>2025-02-24 <br/> 02:27:25</>, <>Micheal Lance Kester Li</>, <>TAKE-OUT</>, <>₱2,475.00</>, <>PREPARING</>],
        [<>12403</>, <>2025-02-24 <br/> 02:27:25</>, <>Dylan Clive Espino</>, <>DINE-IN</>, <>₱581.00</>, <>DONE</>],
        [<>26891</>, <>2025-02-24 <br/> 02:27:25</>, <>Mark Anthony Amper</>, <>TAKE-OUT</>, <>₱888.00</>, <>PREPARING</>],
    ]
    const tbrowsPreOrders = [
        [<>25569</>, <>2025-02-24 <br/> 02:27:25</>, <>Micheal Lance Kester Li</>, <>TAKE-OUT</>, <>₱2,475.00</>, <>PRE-ORDER</>],
        [<>12403</>, <>2025-02-24 <br/> 02:27:25</>, <>Dylan Clive Espino</>, <>DINE-IN</>, <>₱581.00</>, <>PRE-ORDER</>],
        [<>26891</>, <>2025-02-24 <br/> 02:27:25</>, <>Mark Anthony Amper</>, <>TAKE-OUT</>, <>₱888.00</>, <>PRE-ORDER</>],
    ]

    return(
        <Group>
            <SideBar ServiceMode />
            <Main>
                <Box Class="search">
                    <Inputbox Title="Search" Type="search" />
                    <Inputbox Title="Filter" Type="text" />
                </Box>
                <Box Title="ORDER" BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrowsOrders } Paginate={ 5 } EditBtn />
                </Box>
                <Box Title="PRE-ORDER" BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrowsPreOrders } Paginate={ 5 } EditBtn />
                </Box>
            </Main>
        </Group>
    )
}