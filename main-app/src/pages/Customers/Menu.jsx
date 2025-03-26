import React from 'react'
import '../../assets/css/pages/customers/Menu.sass'
import { user, menulistdata } from '../../constant'
import { Title, Body_addclass, Header, Footer, Main, Section, Group, Box, Inputbox, Selectionbox, ItemMenu, Modal, Form, Outputfetch, InsertFileButton, Button, DateText, TimeText, Radio, CheckedItem, } from '../../exporter/component_exporter'

export default function MenuPage() {
    Title('Metro 7 | Menu')
    Body_addclass('Menu-PAGE')

    return(
        <>
        <Main>
            <Section Title='Menu Order' Class='menu-notauth'>
                <Group Col>
                    <Box Class='search'>
                        <Inputbox Title='Search' Type='search' />
                        <Selectionbox Title='Filter' />
                    </Box>
                    <Group Wrap>
                        <ItemMenu List={ menulistdata } />
                    </Group>
                </Group>
            </Section>
        </Main>
        <Footer />
        </>
    )
}
