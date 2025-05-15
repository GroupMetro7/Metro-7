import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/services/Management.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Modal, Form, Outputfetch } from '../../exporter/component_exporter'
import axiosClient from '../../axiosClient'

export default function StaffOrderList() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    const [orders, setOrders ] = useState([]);
    const [selectedOrder, setSelectedOrder ] = useState(null);

    useEffect(()=> {
      const fetchOrders = async () => {
        try {
          const response = await axiosClient.get('/orders');
          setOrders(response.data);
        } catch(error){
          console.error("Fetch Error: ", error);
        }
      };
      fetchOrders();
    }, []);


    const tbhead = ['ORDER NO.',  'CUSTOMER', 'AMOUNT', 'OPTION', 'STATUS']
    const tbrowsOrders = orders.map((order) => ({
      orderId : order.order_number,
      name : order.name,
      amount: order.amount,
      option: order.option,
      status : order.status,
      edit: () => setSelectedOrder(order),
    }))
    const tbrowsPreOrders = [
        [<>25569</>, <>2025-02-24 <br/> 02:27:25</>, <>Micheal Lance Kester Li</>, <>TAKE-OUT</>, <>₱2,475.00</>, <>PRE-ORDER</>],
        [<>12403</>, <>2025-02-24 <br/> 02:27:25</>, <>Dylan Clive Espino</>, <>DINE-IN</>, <>₱581.00</>, <>PRE-ORDER</>],
        [<>26891</>, <>2025-02-24 <br/> 02:27:25</>, <>Mark Anthony Amper</>, <>TAKE-OUT</>, <>₱888.00</>, <>PRE-ORDER</>],
    ]

    return(
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox Title="Search" Type="search" />
            <Inputbox Title="Filter" Type="text" />
          </Box>
          <Box Title="ORDER" BoxCol>
            <Table HeadRows={tbhead} DataRows={tbrowsOrders} EditBtn />
          </Box>
        </Main>
      </Group>

      {/* Modal to display tickets for the selected order */}
      {selectedOrder && (
        <Modal Modal="EditModal" onClose={() => setSelectedOrder(null)}>
          <Form Title={`${selectedOrder.order_number}`} FormThreelayers>
            <Group Class="outputfetch" Wrap>
              <Outputfetch Title="Order No." Value={selectedOrder.id} OutCol OutWhite />
              <Outputfetch
                Title="Order Date"
                Value={new Date(selectedOrder.created_at).toLocaleString()}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Customer Name"
                Value={selectedOrder.name}
                OutCol
                OutWhite
              />
              <Outputfetch Title="Options" Value={selectedOrder.option} OutCol OutWhite />
              <Outputfetch Title="Status" Value={selectedOrder.status} OutCol OutWhite />
            </Group>
            <Group Class="outputfetch" Col>
              <h3>Tickets</h3>
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.tickets.map((ticket, index) => (
                    <tr key={index}>
                      <td>{ticket.product_name}</td>
                      <td>{ticket.quantity}x</td>
                      <td>₱{ticket.unit_price}</td>
                      <td>₱{ticket.total_price}</td>
                    </tr>
                  ))}
                  <h2>Total Amount</h2>
                  <h2>{selectedOrder.amount}</h2>
                </tbody>
              </table>
            </Group>
          </Form>
        </Modal>
      )}
    </>
    );
}
