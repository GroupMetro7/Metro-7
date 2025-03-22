import React from 'react'
import '../../assets/css/pages/customers/Menu.sass'
import { Title, Body_addclass, Header, Footer, Main, Section, Group, Box, Inputbox, ItemMenu } from '../../exporter/component_exporter'

export default function MenuPage() {
    Title('Metro 7 | Menu')
    Body_addclass('Menu-PAGE')


    const orderlist = [
        [<>Burger</>, <>₱559.00</>, {  }],
        [<>Espresso</>, <>₱358.00</>, {  }],
        [<>Carbonara</>, <>₱1,258.00</>, {  }],
        [<>Burger</>, <>₱559.00</>, {  }],
        [<>Espresso</>, <>₱358.00</>, {  }],
        [<>Carbonara</>, <>₱1,258.00</>, {  }]
    ]

    return(
        <>
        <Main>
            <Section Title="Menu Order" Class="menu">
                <Group Col>
                    <Box Class="search">
                        <Inputbox Title="Search" Type="search" />
                        <Inputbox Title="Filter" Type="text" />
                    </Box>
                    <Group Wrap>
                        <ItemMenu List={ orderlist } />
                    </Group>
                </Group>
            </Section>
        </Main>
        <Footer />
        </>
    )
}
