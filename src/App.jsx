// FOR TRIAL & ERROR PURPOSES ONLY

import React from 'react'
import { Title, Header, Footer, SideBar, DateText, Main, TimeText, Inputbox, Button, SubmitButton, InsertFileButton, Href, Radio, Section, Box, Group, Body_addclass, TBHead, TBData, Table, Form, ItemMenu, KPI, Modal, Selectionbox } from './exporter/component_exporter'
import './App.sass'
import { M7Logo, DashboardLogo, SalesLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo } from './exporter/public_exporter'


function App() {
  Title('Metro 7')
  Body_addclass('Trial-PAGE')

  const tbhead = ['SKU NO.', 'ITEM NAME', 'CATEGORY', 'STOCK', 'UNIT COST', 'STOCK VALUE', 'STATUS', 'LAST UPDATED']
  const tbrows = [
      [<>VEG-1989</>, <>Tomato</>, <>Vegetable</>, 99, <>₱25.00</>, <>₱2,475.00</>, 'AVAILABLE', <>2025-02-24 <br /> 02:27:25</>],
      [<>OIL-1580</>, <>Olive Oil</>, <>Oil</>, 6, <>₱89.00</>, <>₱534.00</>, 'LOW STOCK', <>2025-02-24 <br /> 02:27:25</>],
      [<>MEA-0008</>, <>Salmon</>, <>Meat</>, 24, <>₱58.00</>, <>₱1,392.00</>, 'AVAILABLE', <>2025-02-24 <br /> 02:27:25</>],
      [<>SWE-0008</>, <>Sugar</>, <>Sweetener</>, 0, <>₱5.50</>, <>₱0.00</>, 'UNVAILABLE', <>2025-02-24 <br /> 02:27:25</>],
  ]

  return (
    <>
      <Group>
        <SideBar AdminMode />
        <Main>
          <Selectionbox Options={["select", "water"]} />
          <Inputbox/>
        </Main>
      </Group>
      <Modal>
        <Form Title="Add Customer"></Form>
      </Modal>
    </>
  )
}

export default App
