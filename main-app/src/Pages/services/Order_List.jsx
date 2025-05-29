import React, { useEffect, useState } from "react";
import "../../assets/css/pages/services/Management.sass";
import {
  Title,
  Body_addclass,
  Group,
  Main,
  Box,
  Inputbox,
  Table,
  Button,
  Modal,
  Form,
  Outputfetch,
  SubmitButton,
  Pagination,
} from "../../exporter/component_exporter";
import useSearchItem from "../../hooks/searchItem";
import useFetchOrder from "../../hooks/orders/fetchOrder";

export default function StaffOrderList() {
  Title("Order List");
  Body_addclass("Management-PAGE");
  // optimized, need to add pre orders tab
  const { orders, selectedOrder, setSelectedOrder, currentPage, totalPages } = useFetchOrder();
  const { searchTerm, setSearchTerm, filteredItems } = useSearchItem("/order/search");

  const tbhead = [
    "ORDER NO.",
    "CUSTOMER",
    "AMOUNT",
    "DISCOUNT",
    "OPTION",
    "STATUS",
  ];
  const tbrowsOrders = (filteredItems && filteredItems.length > 0 ? filteredItems : orders).map((order) => ({
    orderId: order.order_number,
    name: order.name,
    amount: order.amount,
    discount: order.discount,
    option: order.option,
    status: order.status,
    edit: () => setSelectedOrder(order),
  }));

  const tbrowsPreOrders = [
    [
      <>25569</>,
      <>
        2025-02-24 <br /> 02:27:25
      </>,
      <>Micheal Lance Kester Li</>,
      <>TAKE-OUT</>,
      <>₱2,475.00</>,
      <>PRE-ORDER</>,
    ],
    [
      <>12403</>,
      <>
        2025-02-24 <br /> 02:27:25
      </>,
      <>Dylan Clive Espino</>,
      <>DINE-IN</>,
      <>₱581.00</>,
      <>PRE-ORDER</>,
    ],
    [
      <>26891</>,
      <>
        2025-02-24 <br /> 02:27:25
      </>,
      <>Mark Anthony Amper</>,
      <>TAKE-OUT</>,
      <>₱888.00</>,
      <>PRE-ORDER</>,
    ],
  ];

    const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox
              Title="Search"
              Type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              Placeholder={"Search by Order No."}
            />
            <Inputbox Title="Filter" Type="text" />
          </Box>
          <Box Title="ORDER" BoxCol>
            <Table HeadRows={tbhead} DataRows={tbrowsOrders} EditBtn />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Main>
      </Group>

      {/* Modal to display tickets for the selected order */}
      {selectedOrder && (
        <Modal Modal="EditModal" onClose={() => setSelectedOrder(null)}>
          <Form Title={`${selectedOrder.order_number}`} FormThreelayers>
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Order No."
                Value={selectedOrder.order_number}
                OutCol
                OutWhite
              />
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
              <Outputfetch
                Title="Options"
                Value={selectedOrder.option}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Status"
                Value={selectedOrder.status}
                OutCol
                OutWhite
              />
            </Group>
            <Group Class="outputfetch" Col>
              <table className="tickets-table" style={{ color: "white" }}>
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
                  <Outputfetch
                    Title="Total Amount"
                    Value={selectedOrder.amount}
                    OutCol
                    OutWhite
                  />
                </tbody>
              </table>
              <Group Class="buttonside">
                <Button Title="CLOSE" CloseModal BtnWhite />
                <SubmitButton Title="SAVE" BtnWhite />
              </Group>
            </Group>
          </Form>
        </Modal>
      )}
    </>
  );
}
