import { useState } from "react";
import React from 'react'
import {
  Title,
  Body_useClass,
  Inputbox,
  SubmitButton,
  Href,
} from "../../../../Main_App/src/components/components_exporter";
import { useStateContext } from "../../../../Main_App/src/Contexts/ContextProvider";
import axiosClient from "../../../../Main_App/src/axiosClient";
import {useNavigate} from 'react-router-dom'
import '../../../../Main_App/src/Static/css/Login.sass'

export default function CustomerLogin(){
  Title("Metro 7 | Login")
  Body_useClass("loginpage")

  const { setUser, setToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axiosClient.post("/login", {
              email,
              password,
          });

          setUser(response.data.user);
          setToken(response.data.token);
          navigate("/");
      } catch (err) {
          setError(
              err.response.data.message || "Login failed, please try again."
          );
      }
  };

  return(
      <>
      <main className="PCMOD-body">
          <section className="loginsection">
              <article>
                  <h1>LOGIN</h1>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  <form onSubmit={handleSubmit}>
                      <section className="inputside">
                          <Inputbox name="Email" type="email" formIn value={email} onChange={(e) => setEmail(e.target.value)} required/>
                          <Inputbox name="Password" type="password" formIn value={password} onChange={(e) => setPassword(e.target.value)} required/>
                      </section>
                      <section className="buttonside">
                          <SubmitButton name="LOGIN" formBtn/>
                          <Href name="CREATE ACCOUNT" navigatation="/guest/register"/>
                      </section>
                  </form>
              </article>
          </section>
      </main>
      </>
  )
}