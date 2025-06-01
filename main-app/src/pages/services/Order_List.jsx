import React, { useEffect, useState } from "react";
import "../../assets/css/pages/services/Management.sass";
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Modal, Form, Outputfetch, SubmitButton, Selectionbox, InsertFileButton, Pagination } from '../../exporter/component_exporter'
import { UseSearchItem, UseFetchOrder, UseModifyOrderList } from '../../exporter/hook_exporter'
import { createWorker } from "tesseract.js";

export default function StaffOrderList() {
    Title("Order List");
    Body_addclass("Management-PAGE");
    // optimized, need to add pre orders tab
    const { orders, selectedOrder, setSelectedOrder, currentPage, totalPages } =
        UseFetchOrder();
    const { searchTerm, setSearchTerm, filteredItems } =
        UseSearchItem("/order/search");
    const { formData, setFormData, handleUpdateOrder, error, success } =
        UseModifyOrderList(selectedOrder);

    const tbhead = [
        "ORDER NO.",
        "CUSTOMER",
        "AMOUNT",
        "DISCOUNT",
        "OPTION",
        "STATUS",
    ];
    const tbrowsOrders = (
        filteredItems && filteredItems.length > 0 ? filteredItems : orders
    ).map((order) => ({
        orderId: order.order_number,
        name: order.name,
        amount: order.amount,
        discount: order.discount,
        option: order.option,
        status: order.status,
        edit: () => {
            setSelectedOrder(order);
        },
    }));

    const tbrowsPreOrders = [
        [
            <>25569</>,
            <>
                2025-02-24 <br /> 02:27:25
            </>,
            <>Micheal Lance Kester Li</>,
            <>TAKE-OUT</>,
            <>₱2,475.00</>,
            <>PRE-ORDER</>,
        ],
        [
            <>12403</>,
            <>
                2025-02-24 <br /> 02:27:25
            </>,
            <>Dylan Clive Espino</>,
            <>DINE-IN</>,
            <>₱581.00</>,
            <>PRE-ORDER</>,
        ],
        [
            <>26891</>,
            <>
                2025-02-24 <br /> 02:27:25
            </>,
            <>Mark Anthony Amper</>,
            <>TAKE-OUT</>,
            <>₱888.00</>,
            <>PRE-ORDER</>,
        ],
    ];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" Type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} Placeholder={"Search by Order No."} />
                        <Inputbox Title="Filter" Type="text" />
                    </Box>
                    <Box Title="ORDER" BoxCol>
                        <Table HeadRows={tbhead} DataRows={tbrowsOrders} EditBtn />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </Box>
                </Main>
            </Group>

            {/* Modal to display tickets for the selected order */}
            
                <Modal Modal="EditModal" onClose={() => setSelectedOrder(null)}>
                {selectedOrder && (
                    <Form Title="EDIT ORDER" FormThreelayers>
                        { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                        success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                        <Group Class="outputfetch" Wrap>
                            <Outputfetch Title="Order No." Value={selectedOrder.order_number} OutCol OutWhite />
                            <Outputfetch Title="Order Date" Value={new Date(selectedOrder.created_at).toLocaleString()} OutCol OutWhite />
                            <Outputfetch Title="Customer Name" Value={selectedOrder.name} OutCol OutWhite />
                            <Outputfetch Title="Options" Value={selectedOrder.option} OutCol OutWhite />
                        </Group>
                        <Group Class='outputfetch' Col>
                            <div>
                                <Outputfetch Title="Items" OutWhite />
                                <Outputfetch Title="Quantity" OutWhite />
                                <Outputfetch Title="Unit Price" OutWhite />
                                <Outputfetch Title="Total Price" OutWhite />
                            </div>
                            {selectedOrder.tickets.map((ticket, index) => (
                                <div key={index}>
                                    <Outputfetch Value={ticket.product_name} OutWhite />
                                    <Outputfetch Value={`x${ticket.quantity}`} OutWhite />
                                    <Outputfetch Value={`₱${ticket.unit_price}`} OutWhite />
                                    <Outputfetch Value={`₱${ticket.total_price}`} OutWhite />
                                </div>
                            ))}
                        </Group>
                        <Group Class="outputfetch" Wrap>
                            <Outputfetch Title="Total Price" Value={selectedOrder.amount} OutCol OutWhite />
                            <Outputfetch Title="Discount" Value={selectedOrder.discount} OutCol OutWhite />
                            <Outputfetch Title="Payment Mode" Value={selectedOrder.option} OutCol OutWhite />
                            <Outputfetch Title="Down Payment Price" Name="downpayment" Value={'₱' + formData.downpayment} onChange={handleInputChange} OutCol OutWhite />
                            <Outputfetch Title="Reference Number" Name="refNumber" Value={formData.refNumber} onChange={handleInputChange} OutCol OutWhite />
                            <Selectionbox Title="Order Status" Name="status" Value={formData.status} Options={["Pending", "Completed", "Cancelled"]} OnChange={handleInputChange} SltCol SltWhite />
                        </Group>
                        <Group Class='outputfetch' Col>
                            <Outputfetch Title="QR Code" OutWhite />
                            <Group >
                                <img />
                                <Group Col>
                                    <p>Please pay a 50% DOWNPAYMENT. Orders without a payment receipt will remain pending. Failure to pay on time will result in cancellation.</p>
                                    <InsertFileButton
                                        Title="ADD OCR PICTURE"
                                        BtnWhite
                                        Accept={"image/*"}
                                        Name="image"
                                        OnChange={async (e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const worker = await createWorker("eng");
                                                await worker.setParameters({
                                                    tessedit_char_whitelist:
                                                        "₱0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,",
                                                });
                                                const rectangle = {
                                                    left: 0,
                                                    top: 0,
                                                    width: 1500,
                                                    height: 1500,
                                                };
                                                const {
                                                    data: { text: rawText },
                                                } = await worker.recognize(file, { rectangle });

                                                // Fix common OCR error: replace '₱4' or 'Amount: 4' with '₱+' or 'Amount: +'
                                                const text = rawText.replace(
                                                    /(₱|Amount\s*[:\-]?)\s*4(?=[\d,]+\.\d{2})/g,
                                                    "$1+"
                                                );

                                                // Extract reference number (example: 10+ digits or alphanumeric)
                                                const refMatch =
                                                    text.match(
                                                        /(?:Reference\s*No\.?:?\s*|Ref(?:erence)?\s*#?:?\s*No\.?:?\s*)/i
                                                    ) || text.match(/([0-9]{13,})/i);
                                                const referenceNumber = refMatch
                                                    ? refMatch[1]
                                                    : "Not found";

                                                // Extract amount (example: ₱+1234.56 or Amount: +1234.56)
                                                const amountMatch =
                                                    text.match(/₱\s*([+-]?[\d,]+\.\d{2})/) ||
                                                    text.match(/Amount\s*[:\-]?\s*([+-]?[\d,]+\.\d{2})/i);
                                                const amount = amountMatch
                                                    ? amountMatch[1]
                                                    : "Not found";

                                                const parsedAmount =
                                                    amount !== "Not found"
                                                        ? parseFloat(amount.replace(/,/g, ""))
                                                        : "";

                                                console.log("Reference Number:", referenceNumber);
                                                console.log("Amount:", parsedAmount);

                                                await worker.terminate();

                                                setFormData({
                                                    refNumber: referenceNumber,
                                                    downpayment: parsedAmount,
                                                });
                                            }
                                        }}
                                    />
                                </Group>
                            </Group>
                        </Group>
                        <Group Class="buttonside">
                            <Button Title="CLOSE" CloseModal BtnWhite />
                            <SubmitButton Title="SAVE" BtnWhite />
                        </Group>
                    </Form>
                )}
                </Modal>
            
        </>
    );
}
