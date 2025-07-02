import React, { useEffect, useState } from "react";
import "../../assets/css/pages/services/Profile.sass";
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
} from "../../Exporter/component_exporter";
import { useStateContext } from "../../Contexts/ContextProvider";
import useAttendanceStaff from "../../hooks/service/attendance";
import useModifyData from "../../hooks/customer/profile/modifyData";
import axiosClient from "../../axiosClient";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import ServiceBarChart from "../../hooks/graphs/serviceBar";
import AttendanceChart from "../../hooks/graphs/attendanceChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

export default function StaffProfile() {
  Title("Profile");
  Body_addclass("Profile-Services-PAGE");
  const screenwidth = ScreenWidth();
  const { handleTimeInClick, handleTimeOutClick } = useAttendanceStaff();
  const { formData, user, handleInputChange, handleUpdateUser } =
    useModifyData();


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
        {screenwidth > 1023 ? (
          <Main Row>
            <Group Class="leftside" Col>
              <Section Title="My Profile" Class="myprofile">
                <Box Class="details">
                  <img
                    src={
                      user?.image
                        ? user.image
                        : "../../../public/Icons/profileIcon.jpg"
                    }
                    alt="Profile"
                  />
                  <article>
                    <h2>
                      {user.firstname} {user.lastname}
                    </h2>
                    <h4>{user.contact}</h4>
                  </article>
                  <Button Title="EDIT PROFILE" OpenModal="EditProfile" />
                </Box>
                <Box Title="Statistics" Class="statistic" BoxCol>
                    <ServiceBarChart />
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
                <AttendanceChart />
              </Box>
          </Main>
        ) : (
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
                <Button Title="EDIT PROFILE" OpenModal="EditProfile" />
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
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FManila&showPrint=0&src=NWE4Zjg5NmM2MTIyYTAyYjhmODNmNThjMWQ4ZTc4YzE1NjY1ODNlNDc4NWVjYzFiMWE0YTlhYzQyOTA2NWY2NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4ucGhpbGlwcGluZXMjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23AD1457&color=%230B8043"></iframe>
              </Box>
              <Box Title="Statistics" Class="statistic" BoxCol>
                <img src="" />
              </Box>
            </Section>
          </Main>
        )}
      </Group>
      <Modal Modal="EditProfile">
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
                onChange={input.OnChange}
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
