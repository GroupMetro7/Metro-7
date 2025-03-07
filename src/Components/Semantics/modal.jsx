import React from 'react'
import '../../Static/css/Components/MODAL_EDITPROFILE.sass'
import { ModalEditprofile } from '../components_exporter'

export default function Modal({ Editprofile }) {
    return(
        <>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                { Editprofile ? <ModalEditprofile/> : undefined }
            </div>
        </div>
        </>
    )
}