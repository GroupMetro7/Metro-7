// FOR TRIAL & ERROR PURPOSES ONLY

import React from 'react'
import { Title, Header, Footer, SideBar, DateText, Main, TimeText, Inputbox, Button, SubmitButton, InsertFileButton, Href, Radio, Section, Box, Group, Body_addclass, TBHead, TBData, Table, Form, ItemMenu, KPI, Modal, Selectionbox, PrepOrder, CheckedItem } from './exporter/component_exporter'
import './App.sass'
import { M7Logo, DashboardLogo, SalesLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo } from './exporter/public_exporter'


function App() {
  Title('Metro 7')
  Body_addclass('Trial-PAGE')

  const user = "Micheal Lance Kester Li"

  const orders = [
      ['#25569', 'TAKE-OUT'],
      ['#25569', 'TAKE-OUT'],
      ['#25569', 'TAKE-OUT'],
      ['#25569', 'TAKE-OUT']
  ]
  const orderlist = [
    [<>Burger</>, 559.00.toFixed(2), {  },],
    [<>Espresso</>, 358.00.toFixed(2), {  }],
    [<>Carbonara</>, 1258.00.toFixed(2), {  }],
    [<>Burger</>, 559.00.toFixed(2), {  }],
    [<>Espresso</>, 358.00.toFixed(2), {  }],
    [<>Carbonara</>, 1258.00.toFixed(2), {  }]
  ]
  const checkedorders = [
    [<>Burger</>, 559.00.toFixed(2), {  }],
    [<>Carbonara</>, 1258.00.toFixed(2), {  }],
  ]

  return (
    <>
      <Group>
        <SideBar AdminMode />
        <Main Row>
          <Group Class="leftside" Col>
            <Section Title='My Profile' Class='myprofile'>
                <Box Class="details">
                    <img />
                    <article>
                        <h2>{ user }</h2>
                        <h4>09774956316</h4>
                    </article>
                    <div className='buttons'>
                        <Button Title='EDIT PROFILE' OpenModal="EditProfile" />
                    </div>
                </Box>
                <Box Title="Sales Status" Class="statistic" BoxCol><img src="" /></Box>
            </Section>
          </Group>
          <Box Class="rightside" BoxCol>
            <Group Class="datetime" Col><h2><DateText /><br /><TimeText /></h2><hr/></Group>
            <Group Class="diningopts">
              <Button Title="TIME-IN" />
              <Button Title="TIME-OUT" />
            </Group>
            <hr/>
          </Box>
        </Main>
      </Group>
      <Modal Modal="EditProfile">
          <Form Title="Edit Profile" FormTwolayers>
              <Group Class='inputside' Wrap>
                  <Inputbox Title='First Name' Type='text' Value="" InCol InWhite />
                  <Inputbox Title='Last Name' Type='text' Value="" InCol InWhite />
                  <Inputbox Title='Email' Type='email' Value="" InCol InWhite />
                  <Inputbox Title='Contact Number' Type='number' Value="" InCol InWhite />
              </Group>
              <Group Class='buttonside'>
                  <Button Title="CANCEL" CloseModal BtnWhite />
                  <SubmitButton Title='SUBMIT' BtnWhite />
              </Group>
          </Form>
      </Modal>
    </>
  )
}

export default App
