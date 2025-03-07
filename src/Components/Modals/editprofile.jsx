import React from 'react'
import '../../Static/css/Components/modal_editprofile.sass'
import { Button, Inputbox, InsertfileButton, SubmitButton } from '../components_exporter'

export default function ModalEditprofile() {
    return(
        <>
        <article class="modal-content">
            <h1>EDIT PROFILE</h1>
            <form>
                <div class="pictureside">
                    <img src="" />
                    <InsertfileButton name="EDIT PICTURE" />
                </div>
                <section class="inputboxside">
                    <Inputbox name="First Name" type="text" formIn />
                    <Inputbox name="Last Name" type="text" formIn />
                    <Inputbox name="Email" type="email" formIn />
                    <Inputbox name="Contact Number" type="number" formIn />
                </section>
                <section class="buttonside">
                    <Button name="CANCEL" closemodal formBtn />
                    <SubmitButton name="CONFIRM" formBtn />
                </section>
            </form>
        </article>
        </>
    )
}