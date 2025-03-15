import React from 'react'
import '../../Static/css/Components/MODAL_FORM.sass'
import { ModalEditprofile, ModalViewOrder, ModalAddproduct, ModalModifyproduct, ModalDeleteproduct, ModalAddemployee, ModalModifyemployee, ModalDeleteemployee, ModalAddcustomer, ModalModifycustomer, ModalDeletecustomer } from '../components_exporter'

export default function Modal({ Editprofile, ViewOrder, Addproduct, Modifyproduct, Deleteproduct, Addemployee, Modifyemployee, Deleteemployee, Addcustomer, Modifycustomer, Deletecustomer }) {
    return(
        <>
        <div class="modal fade" id="Modal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                { Editprofile ? <ModalEditprofile/> : undefined }
                { ViewOrder ? <ModalViewOrder/> : undefined }
                { Addproduct ? <ModalAddproduct/> : undefined }
                { Modifyproduct ? <ModalModifyproduct/> : undefined }
                { Deleteproduct ? <ModalDeleteproduct/> : undefined }
                { Addemployee ? <ModalAddemployee/> : undefined }
                { Modifyemployee ? <ModalModifyemployee/> : undefined }
                { Deleteemployee ? <ModalDeleteemployee/> : undefined }
                { Addcustomer ? <ModalAddcustomer/> : undefined }
                { Modifycustomer ? <ModalModifycustomer/> : undefined }
                { Deletecustomer ? <ModalDeletecustomer/> : undefined }
            </div>
        </div>
        </>
    )
}