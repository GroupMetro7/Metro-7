import React, { useEffect, useState } from "react";
import "../../Assets/CSS/Pages/Services/Management.sass";
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
  Selectionbox,
  InsertFileButton,
  Pagination,
  ScreenWidth,
} from "../../Exporter/Component_Exporter";
import useReservationFunctions from "../../Hooks/Universal/reservationFunctions";

export default function ReservationList() {
  Title("Table Reservation List");
  Body_addclass("Management-PAGE");

  const {
    reservations,
    selectedReservation,
    updateReservation,
    updateReservationStatus,
    handleInputChange,
    error,
    success,
  } = useReservationFunctions();

  const tbhead = [
    "Customer",
    "reservation type",
    "date",
    "time",
    "party size",
    "status",
  ];

  const tbdata = reservations.map((res) => ({
    customer: res.user.firstname + " " + res.user.lastname,
    reservationsType: res.reservation_type,
    date: new Date(res.date).toLocaleDateString(),
    time: res.time,
    partySize: res.party_size,
    status: res.status,
    edit: () => {
      updateReservation(res);
    },
  }));

  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox
              Type="search"
              Title="Search"
              OnChange={""}
              Placeholder="Search Reservation number"
            />
          </Box>
          <Box Title="RESERVATION" BoxCol>
            <Table HeadRows={tbhead} DataRows={tbdata} EditBtn />
            {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
          </Box>
        </Main>
      </Group>

      <Modal Modal="edit-modal">
        {selectedReservation && (
          <Form
            Title="Reservation"
            FormThreelayers
            OnSubmit={updateReservationStatus}
          >
            {(error && (
              <Group Class="signalside">
                <p class="error">{error}</p>
              </Group>
            )) ||
              (success && (
                <Group Class="signalside">
                  <p class="success">{success}</p>
                </Group>
              ))}
            <Group Class="inputside">
              <Outputfetch
                Title="Name"
                Value={
                  selectedReservation.user.firstname +
                  " " +
                  selectedReservation.user.lastname
                }
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Reservation Type"
                Value={selectedReservation.reservation_type}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Date"
                Value={new Date(selectedReservation.date).toLocaleDateString()}
                OutCol
                OutWhite
              />
            </Group>
            <Group Class="inputside">
              <Outputfetch
                Title="Time"
                Value={selectedReservation.time}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Party Size"
                Value={selectedReservation.party_size}
                OutCol
                OutWhite
              />
              <Selectionbox
                Title="Status"
                Value={selectedReservation.status}
                Name="status"
                Options={["pending", "confirmed", "cancelled", "completed"]}
                OnChange={handleInputChange}
                SltCol
                SltWhite
              />
            </Group>
            <Group Class="buttonside">
              <Button Title="CLOSE" CloseModal BtnWhite />
              <SubmitButton Title="SUBMIT" BtnWhite />
            </Group>
          </Form>
        )}
      </Modal>
    </>
  );
}
