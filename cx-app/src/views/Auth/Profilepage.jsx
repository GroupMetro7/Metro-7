import { Body_useClass, Button, Modal, Title } from "../../../../Main_App/src/components/components_exporter";
import { useStateContext } from "../../../../Main_App/src/Contexts/ContextProvider";
import '../../../../Main_App/src/Static/css/Profile.sass'

export default function CustomerProfile() {
  Title("Profile");
  Body_useClass("profilepage");
  const { user } = useStateContext();

  return (
    <>
      <main className="PCMOD-body">
        <section className="profilesection">
          <h1>MY PROFILE</h1>
          <div className="container">
            <div className="myprofile">
              <img />
              <article>
                <h2 className="name">{user.firstname} {user.lastname}</h2>
                <h3>{user.email}</h3>
                <h3>{user.contact}</h3>
                <h3 className="loyalty">silver</h3>
              </article>
              <div className="buttons">
                <Button
                  name="EDIT PROFILE"
                  modalname="#exampleModal"
                  openmodal
                />
              </div>
            </div>
            <div className="orderhistory">
              <h2>ORDER HISTORY</h2>
              <div className="tb">
                <div className="head">
                  <div className="col"></div>
                  <div className="col">
                    <h3>ORDER NO.</h3>
                  </div>
                  <div className="col">
                    <h3>ORDER DATE</h3>
                  </div>
                  <div className="col">
                    <h3>OPTIONS</h3>
                  </div>
                  <div className="col">
                    <h3>AMOUNT</h3>
                  </div>
                  <div className="col">
                    <h3>STATUS</h3>
                  </div>
                </div>
                <div className="tbrow">
                  <div className="tbrow-2">
                    <div className="col">
                      <Button name="VIEW" />
                    </div>
                    <div className="col">
                      <h3>234567</h3>
                    </div>
                    <div className="col">
                      <h3>
                        2025-02-24 <br /> 02:27:25
                      </h3>
                    </div>
                    <div className="col">
                      <h3>TAKE OUT</h3>
                    </div>
                    <div className="col">
                      <h3>₱559.00</h3>
                    </div>
                    <div className="col status pending">
                      <h3>PENDING</h3>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="tbrow">
                  <div className="tbrow-2">
                    <div className="col">
                      <Button name="VIEW" />
                    </div>
                    <div className="col">
                      <h3>181818</h3>
                    </div>
                    <div className="col">
                      <h3>
                        2025-02-22 <br /> 02:27:25
                      </h3>
                    </div>
                    <div className="col">
                      <h3>TAKE OUT</h3>
                    </div>
                    <div className="col">
                      <h3>₱358.00</h3>
                    </div>
                    <div className="col status paid">
                      <h3>PAID</h3>
                    </div>
                  </div>
                  <hr />
                </div>
                <div className="tbrow">
                  <div className="tbrow-2">
                    <div className="col">
                      <Button name="VIEW" />
                    </div>
                    <div className="col">
                      <h3>176923</h3>
                    </div>
                    <div className="col">
                      <h3>
                        2025-01-08 <br /> 03:33:03
                      </h3>
                    </div>
                    <div className="col">
                      <h3>DINE-IN</h3>
                    </div>
                    <div className="col">
                      <h3>₱1,258.00</h3>
                    </div>
                    <div className="col status paid">
                      <h3>PAID</h3>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </section>
        <Modal Editprofile/>
      </main>
    </>
  );
}
