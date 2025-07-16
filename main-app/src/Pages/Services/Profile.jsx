import React, { useEffect, useState } from "react";
import "../../Assets/CSS/Pages/Services/Profile.sass";
import {
  ScreenWidth,
  Title,
  Body_addclass,
  Group,
  Main,
  Box,
  Inputbox,
  Section,
  Button,
  Modal,
  Form,
  DateText,
  TimeText,
  SubmitButton,
  Graph
} from "../../Exporter/Component_Exporter";
import { useStateContext } from "../../Contexts/ContextProvider";
import useAttendanceStaff from "../../hooks/service/attendance";
import useModifyData from "../../hooks/customer/profile/modifyData"
import ServiceSalesReport from "../../hooks/graphs/Service_Sales_Report";
import AttendanceChart from "../../Hooks/graphs/Attendance_Chart";

export default function StaffProfile() {
  Title("Profile");
  Body_addclass("Profile-Services-PAGE");
  const screenwidth = ScreenWidth();
  const { handleTimeInClick, handleTimeOutClick } = useAttendanceStaff();
  const { formData, user, handleInputChange, handleUpdateUser } =
    useModifyData();

  const { ServiceSalesReportData, ServiceSalesReportOptions } = ServiceSalesReport()
  const { AttendanceChartData, AttendanceChartOptions } = AttendanceChart()

  const Inputboxes = [
    {
      Title: "First Name",
      Type: "text",
      Name: "firstname",
      Value: formData.firstname,
      InCol: true,
      InWhite: true,
      OnChange: handleInputChange,
    },
    {
      Title: "Last Name",
      Type: "text",
      Name: "lastname",
      Value: formData.lastname,
      InCol: true,
      InWhite: true,
      OnChange: handleInputChange,
    },
    {
      Title: "Email",
      Type: "email",
      Name: "email",
      Value: formData.email,
      InCol: true,
      InWhite: true,
      OnChange: handleInputChange,
    },
    {
      Title: "Contact Number",
      Type: "number",
      Name: "contact",
      Value: formData.contact,
      InCol: true,
      InWhite: true,
      OnChange: handleInputChange,
    },
  ];

  return (
    <>
      <Group>
        {screenwidth > 1023 ?
          <Main Row>
            <Group Class="leftside" Col>
              <Section Title="My Profile" Class="myprofile">
                <Box Class="details">

                  <article>
                    <h2>
                      {user.firstname} {user.lastname}
                    </h2>
                    <h4>{user.contact}</h4>
                  </article>
                  <Button Title="EDIT PROFILE" OpenModal="editprofile-modal" />
                </Box>
                <Box Title="Statistics" Class="statistic" BoxCol>
                  <Graph BarGraph Data={ ServiceSalesReportData } Options={ ServiceSalesReportOptions } />
                </Box>
              </Section>
            </Group>
            <Box Class="rightside" BoxCol>
              <Group Class="datetime" Col>
                <h3>
                  <DateText />
                  <br />
                  <TimeText />
                </h3>
                <hr />
              </Group>
              <Group Class="timeintimeout">
                <Button Title="TIME-IN" Onclick={handleTimeInClick} />
                <Button Title="TIME-OUT" Onclick={handleTimeOutClick} />
              </Group>
              <hr />
              <Group Class="attendance">
                <Graph BarGraph Data={ AttendanceChartData } Options={ AttendanceChartOptions } />
              </Group>
              </Box>
          </Main>
        :
          <Main>
            <Section Title="My Profile" Class="myprofile">
              <Box Class="details">
                <img />
                <article>
                  <h2>
                    {user.firstname} {user.lastname}
                  </h2>
                  <h4>{user.contact}</h4>
                </article>
                <Button Title="EDIT PROFILE" OpenModal="editprofile-modal" />
              </Box>
                <Box Class="attendance" BoxCol>
                  <Group Class="datetime" Col>
                    <h3>
                      <DateText />
                      <br />
                      <TimeText />
                    </h3>
                    <hr />
                  </Group>
                  <Group Class="timeintimeout">
                    <Button Title="TIME-IN" Onclick={handleTimeInClick} />
                    <Button Title="TIME-OUT" Onclick={handleTimeOutClick} />
                  </Group>
                  <hr />
                  <Group Class="attendance">
                    <Graph BarGraph Data={ AttendanceChartData } Options={ AttendanceChartOptions } />
                  </Group>
                </Box>
                <Box Title="Statistics" Class="statistic" BoxCol>
                  <Graph BarGraph Data={ ServiceSalesReportData } Options={ ServiceSalesReportOptions } />
                </Box>
            </Section>
          </Main>
        }
      </Group>
      <Modal Modal="editprofile-modal">
        <Form Title="Edit Profile" FormTwolayers OnSubmit={handleUpdateUser}>
          <Group Class="inputside" Wrap>
            {Inputboxes.map((input, index) => (
              <Inputbox
                key={index}
                Title={input.Title}
                Type={input.Type}
                InCol={input.InCol}
                InWhite={input.InWhite}
                Value={input.Value}
                OnChange={input.OnChange}
                Name={input.Name}
              />
            ))}
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <SubmitButton Title="SUBMIT" BtnWhite />
          </Group>
        </Form>
      </Modal>
    </>
  );
}
