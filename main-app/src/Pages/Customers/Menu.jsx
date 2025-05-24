import React from 'react'
import '../../assets/css/pages/customers/Menu.sass'
import { menulistdata } from '../../constant'
import { Title, Body_addclass, Header, Footer, Main, Section, Group, Box, Inputbox, Selectionbox, ItemMenu, Modal, Form, Outputfetch, InsertFileButton, Button, DateText, TimeText, Radio, CheckedItem, } from '../../Exporter/component_exporter'
import CustomerLayout from '../../components/Layout/CustomerLayout'
import { useStateContext } from '../../Contexts/ContextProvider'
import GuestLayout from '../../components/Layout/GuestLayout'

export default function MenuPage() {
    Title('Metro 7 | Menu')
    Body_addclass('Menu-PAGE')
    const { token} = useStateContext();
    return(
        <>
        {token ? (
                  <CustomerLayout />
                ):(
                  <GuestLayout />
                )}
        <Main>
            <Section Title='Menu Order' Class='menu'>
                <Group Col>
                    <Box Class='search'>
                        <Inputbox Title='Search' Type='search' />
                    </Box>
                    <Group Class='filter'>
                        <Radio Title='Meal' Value='Meal' RadioName='Category' BtnWhite />
                        <Radio Title='Liquor' Value='Meal' RadioName='Category' BtnWhite />
                        <Radio Title='Deserts' Value='Meal' RadioName='Category' BtnWhite />
                        <Radio Title='Breakfast' Value='Meal' RadioName='Category' BtnWhite />
                    </Group>
                    <Group Class='items' Wrap>
                        <ItemMenu List={ menulistdata } />
                    </Group>
                </Group>
            </Section>
        </Main>
        <Footer />
        </>
    )
}
