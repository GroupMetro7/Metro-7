import React from "react";
import "../../assets/css/pages/customers/Reservation.sass";
import {
  ScreenWidth,
  Title,
  Body_addclass,
  Footer,
  Main,
  Section,
  Form,
  Group,
  Inputbox,
  SubmitButton,
  Selectionbox,
} from "../../Exporter/component_exporter";
import useCreateReservation from "../../hooks/reservation/createReservation";


export default function ReservationPage() {
  Title("Metro 7 | Reservation");
  Body_addclass("Reservation-PAGE");
  const screenwidth = ScreenWidth();
  //this file needs to be updated
  const {
    formData,
    handleInputChange,
    handleCreateReservation,
    error,
    success,
  } = useCreateReservation();

  return (
    <>
      <Main>
        <Section Class="reservation">
          <Form
            Title="RESERVATION"
            {...(screenwidth > 766 && { FormTwolayers: true })}
            OnSubmit={handleCreateReservation}
          >
            {error && (
              <p className="error" style={{ color: "red" }}>
                {error}
              </p>
            )}
            {success && (
              <p className="success" style={{ color: "green" }}>
                {success}
              </p>
            )}
            <Group Col>
              <Group Class="infoside" Col>
                <h5>HOURS: OPEN - CLOSES 10:00PM</h5>
                <h5>MOBILE NUMBER: 09952332528</h5>
              </Group>
              <hr />
              <Group
                Class="inputside"
                {...(screenwidth > 766 ? { Wrap: true } : { Col: true })}
              >
                <Selectionbox
                  Title="Reservation Type"
                  Name="reservationType"
                  Value={formData.reservationType}
                  Options={[
                    { label: "Solo", value: "Solo" },
                    { label: "Group", value: "Group" },
                    { label: "Event", value: "Event" },
                  ]}
                  SltCol
                  SltWhite
                  OnChange={handleInputChange}
                />
                <Inputbox
                  Title="Party Size"
                  Type="number"
                  Name="partySize"
                  Value={formData.partySize}
                  InCol
                  InWhite
                  onChange={handleInputChange}
                />
                <Inputbox
                  Title="Date"
                  Type="date"
                  Name="date"
                  Value={formData.date}
                  InCol
                  InWhite
                  onChange={handleInputChange}
                />
                <Inputbox
                  Title="Time"
                  Type="time"
                  Name="time"
                  Value={formData.time}
                  InCol
                  InWhite
                  onChange={handleInputChange}
                />
              </Group>
            </Group>
            <Group Class="buttonside">
              <SubmitButton Title="SUBMIT" BtnWhite />
            </Group>
          </Form>
        </Section>
      </Main>
      <Footer />
    </>
  );
}
