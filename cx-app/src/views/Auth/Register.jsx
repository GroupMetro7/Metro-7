import { useState } from "react";
import {
  Title,
  Body_useClass,
  Inputbox,
  SubmitButton,
} from "../../../../Main_App/src/components/components_exporter";
import React from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../../Main_App/src/axiosClient";
import '../../../../Main_App/src/Static/css/Register.sass'

export default function CustomerRegister() {
  Title("Metro 7 | Register");
  Body_useClass("registerpage");
  const [lastname, setLastName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axiosClient.post("/register", {
        lastname,
        firstname,
        email,
        contact,
        password,
        password_confirmation: passwordConfirmation,
      });
      localStorage.setItem('ACCESS_TOKEN', response.data.token);
      window.location.reload();
      navigate('/');
    } catch (err) {
      setError(
        err.response.data.message || "Registration failed, please try again."
      );
    }
  };

  return (
    <>
      <main className="PCMOD-body">
        <section className="registersection">
          <article>
            <h1>REGISTER</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <section className="inputside">
                <div className="inputboxside">
                  <Inputbox
                    name="First Name"
                    type="text"
                    formIn
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Inputbox
                    name="Last Name"
                    type="text"
                    formIn
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <Inputbox
                    name="Email"
                    type="email"
                    formIn
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Inputbox
                    name="Contact Number"
                    type="text"
                    formIn
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                  <Inputbox
                    name="Password"
                    type="password"
                    formIn
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Inputbox
                    name="Confirm Password"
                    type="password"
                    formIn
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                  />
                </div>
                {/* <div class="bodytermsandcondition">
                        <input type="checkbox"/>
                        <span class="body-text8">
                            You agree to our Terms and Privacy Policy upon registration.
                        </span>
                    </div> */}
              </section>
              <SubmitButton name="SUBMIT" formBtn />
            </form>
          </article>
        </section>
      </main>
    </>
  );
}
