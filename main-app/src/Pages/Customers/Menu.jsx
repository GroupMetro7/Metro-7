import { useState } from "react";
import "../../assets/css/pages/customers/Menu.sass";
import { ScreenWidth, Title, Body_addclass, Main, Section, Group, Box, Inputbox, ItemMenu, Modal, Form, Outputfetch, InsertFileButton, Button, DateText, TimeText, Radio, CheckedItem, SubmitButton, } from "../../Exporter/component_exporter";
import { useStateContext } from "../../Contexts/ContextProvider";
import { createWorker } from "tesseract.js";
import useFetchProduct from "../../hooks/service/fetchProducts";
import useFetchOrder from "../../hooks/uni/fetchProducts";
import useCreateOrder from "../../hooks/orders/createOrderCustomer";

export default function MenuPage() {
  const { user } = useStateContext()
  Title("Metro 7 | Menu");
  Body_addclass("Menu-PAGE");
  const screenwidth = ScreenWidth()
  const { categories } = useFetchOrder();
  const { menuItems, selectedCategory, setSelectedCategory, setSearchItem } =
    useFetchProduct();


  const {
    order,
    diningOpt,
    setDiningOpt,
    discount,
    addItemToOrder,
    removeItemFromOrder,
    submitOrder,
    formData,
    setFormData,
    isLoading
  } = useCreateOrder();

  const menulistdata = menuItems.map((product) => ({
    id: product.id,
    image: product.image_url,
    product_name: product.product_name,
    quantity: order.find((item) => item.id === product.id)?.quantity || 0,
    price: product.price,
    is_available: product.is_available,
  }));

  const checkedorders = order.map((product) => ({
    id: product.id,
    product_name: product.product_name,
    price: product.price,
    quantity: product.quantity,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {user && user.id ?
        screenwidth > 766 ?
        <Main Row>
          <Group Class="leftside" Col>
            <Section Title="Menu Order" Class="menu">
              <Group Col>
                <Box Class="search">
                  <Inputbox
                    Title="Search"
                    Type="search"
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                </Box>
                <Group Class="filter">
                  {categories.map((cat) => (
                    <Radio
                      key={cat.id}
                      Title={cat.name}
                      Value={cat.id}
                      RadioName="Category"
                      Checked={selectedCategory === cat.id}
                      OnChange={() => setSelectedCategory(cat.id)}
                      BtnWhite
                    />
                  ))}
                </Group>
                <Group Class="items" Wrap>
                  <ItemMenu
                    List={menulistdata}
                    addItemToOrder={addItemToOrder}
                    removeItemFromOrder={removeItemFromOrder}
                    AuthenticatedMode={user.id}
                  />
                </Group>
              </Group>
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
            <Group Class="opts">
              <Radio
                Title="DINE-IN"
                RadioName="Options"
                Value="DINE-IN"
                Checked={diningOpt === "DINE-IN"}
                OnChange={(e) => setDiningOpt(e.target.value)}
              />
              <Radio
                Title="TAKE-OUT"
                RadioName="Options"
                Value="TAKE-OUT"
                Checked={diningOpt === "TAKE-OUT"}
                OnChange={(e) => setDiningOpt(e.target.value)}
              />
            </Group>
            <hr />
            <Group Class="totalitem">
              <h3>ORDER SUMMARY</h3>
              <div className="itemlist">
                <CheckedItem
                  List={checkedorders}
                  addItemToOrder={addItemToOrder}
                  removeItemFromOrder={removeItemFromOrder}
                />
              </div>
            </Group>
            {checkedorders != 0 && (
              <>
                <hr />
                <Group Class="paymentsum" Col>
                  <article>
                    <h3>TOTAL:</h3>
                    <h3>₱{Number(formData.totalPrice).toFixed(2)}</h3>
                  </article>
                  <Button
                    Title="CHECKOUT"
                    OpenModal="CheckoutModal"
                    Disabled={!diningOpt}
                  />
                </Group>
              </>
            )}
          </Box>
        </Main>
        :
        <Main>
          <Section Title="Menu Order" Class="menu-oneside" UpperRight={<><Button Title={`CHECKOUT${checkedorders != 0 ? ` (₱${Number(formData.totalPrice).toFixed(2)})` : ""}`} OpenModal="CheckoutModal" BtnWhite /></>}>
            <Group Col>
              <Group Class="opts">
                <Radio
                  Title="DINE-IN"
                  RadioName="Options"
                  Value="DINE-IN"
                  Checked={diningOpt === "DINE-IN"}
                  OnChange={(e) => setDiningOpt(e.target.value)}
                  BtnWhite
                />
                <Radio
                  Title="TAKE-OUT"
                  RadioName="Options"
                  Value="TAKE-OUT"
                  Checked={diningOpt === "TAKE-OUT"}
                  OnChange={(e) => setDiningOpt(e.target.value)}
                  BtnWhite
                />
              </Group>
              <Box Class="search">
                  <Inputbox Title="Search" Type="search" onChange={(e) => setSearchItem(e.target.value)} />
              </Box>
              <Group Class="filter">
                {categories.map((cat) => (
                  <Radio
                    key={cat.id}
                    Title={cat.name}
                    Value={cat.id}
                    RadioName="Category"
                    Checked={selectedCategory === cat.id}
                    OnChange={() => setSelectedCategory(cat.id)}
                    BtnWhite
                  />
                ))}
              </Group>
              <Group Class="items" Wrap>
                <ItemMenu
                  List={menulistdata}
                  addItemToOrder={addItemToOrder}
                  removeItemFromOrder={removeItemFromOrder}
                  AuthenticatedMode={ user.id }
                />
              </Group>
            </Group>
          </Section>
        </Main>
      :
        <Main>
          <Section Title="Menu Order" Class="menu-oneside">
            <Group Col>
              <Box Class="search">
                  <Inputbox Title="Search" Type="search" onChange={(e) => setSearchItem(e.target.value)} />
              </Box>
              <Group Class="filter">
                {categories.map((cat) => (
                  <Radio
                    key={cat.id}
                    Title={cat.name}
                    Value={cat.id}
                    RadioName="Category"
                    Checked={selectedCategory === cat.id}
                    OnChange={() => setSelectedCategory(cat.id)}
                    BtnWhite
                  />
                ))}
              </Group>
              <Group Class="items" Wrap>
                <ItemMenu List={menulistdata} />
              </Group>
            </Group>
          </Section>
        </Main>
      }
      {user && user.id && (
        <Modal Modal="CheckoutModal">
          <Form
            Title="CHECKOUT"
            {...(screenwidth > 1023
              ? { FormThreelayers: true }
              : screenwidth > 766
              ? { FormTwolayers: true }
              : { Col: true })}
            OnSubmit={submitOrder}
          >
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Customer Name"
                Value={user.firstname + " " + user.lastname}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Date"
                Value={`${new Date().getFullYear()}-${(
                  new Date().getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}-${new Date()
                  .getDate()
                  .toString()
                  .padStart(2, "0")} | ${new Date().toLocaleTimeString([], {
                  timeStyle: "short",
                })}`}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Order Options"
                Value={diningOpt}
                OutCol
                OutWhite
              />
            </Group>
            <Group Class="outputfetch" Col>
              <div>
                <Outputfetch Title="Items" OutWhite />
                <Outputfetch Title="Quantity" OutWhite />
                <Outputfetch Title="Unit Price" OutWhite />
                <Outputfetch Title="Total Price" OutWhite />
              </div>
              {order.map((product, index) => (
                <div key={index}>
                  <Outputfetch Value={product.product_name} OutWhite />
                  <Outputfetch Value={`x${product.quantity}`} OutWhite />
                  <Outputfetch Value={`₱${product.price}`} OutWhite />
                  <Outputfetch
                    Value={`₱${Number(product.price * product.quantity).toFixed(
                      2
                    )}`}
                    OutWhite
                  />
                </div>
              ))}
            </Group>
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Total Price"
                Value={`₱${Number(formData.totalPrice).toFixed(2)}`}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Discount"
                Value={`₱${discount.toFixed(2)}`}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Reference Number"
                Value={formData.refNumber}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Down Payment Price"
                Value={`₱${formData.downpayment}`}
                OutCol
                OutWhite
              />
            </Group>
            <Group Class="outputfetch" Col>
              <Outputfetch Title="QR Code" OutWhite />
              <Group {...(screenwidth < 767 ? { Col: true } : {})}>
                <img />
                <Group Col>
                  <p>
                    Please pay a 50% DOWNPAYMENT. Orders without a payment
                    receipt will remain pending. Failure to pay on time will
                    result in cancellation.
                  </p>
                  {screenwidth > 766 &&
                  <InsertFileButton
                    Title="UPLOAD GCASH RECEIPT"
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
                        const {
                          data: { text: rawText },
                        } = await worker.recognize(file);

                        // Fix common OCR error: replace '₱4' or 'Amount: 4' with '₱+' or 'Amount: +'
                        const text = rawText.replace(
                          /(₱|Amount\s*[:\-]?)\s*4(?=[\d,]+\.\d{2})/g,
                          "$1+"
                        );

                        // Extract reference number (example: 10+ digits or alphanumeric)
                        const refMatch =
                          text.match(
                            /(?:Reference\s*No\.?|Ref(?:erence)?\s*#?\s*No\.?)\s*[:\-]?\s*([A-Za-z0-9]{8,})/i
                          ) || text.match(/([0-9]{13,})/);
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

                        setFormData((prev) => ({
                          ...prev,
                          refNumber: referenceNumber,
                          downpayment: parsedAmount,
                        }));
                      }
                    }}
                  />
                  }
                </Group>
              </Group>
            </Group>
          {screenwidth > 766 ?
            <Group Class="buttonside">
              <Button Title="CANCEL" CloseModal BtnWhite />
              <SubmitButton Title={isLoading ? "SUBMITTING..." : "CHECKOUT"} disabled={isLoading} BtnWhite />
            </Group>
            :
            <Group Class="buttonside" Col>
              <InsertFileButton
                Title="UPLOAD GCASH RECEIPT"
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
                    const {
                      data: { text: rawText },
                    } = await worker.recognize(file);

                    // Fix common OCR error: replace '₱4' or 'Amount: 4' with '₱+' or 'Amount: +'
                    const text = rawText.replace(
                      /(₱|Amount\s*[:\-]?)\s*4(?=[\d,]+\.\d{2})/g,
                      "$1+"
                    );

                    // Extract reference number (example: 10+ digits or alphanumeric)
                    const refMatch =
                      text.match(
                        /(?:Reference\s*No\.?|Ref(?:erence)?\s*#?\s*No\.?)\s*[:\-]?\s*([A-Za-z0-9]{8,})/i
                      ) || text.match(/([0-9]{13,})/);
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

                    setFormData((prev) => ({
                      ...prev,
                      refNumber: referenceNumber,
                      downpayment: parsedAmount,
                    }));
                  }
                }}
              />
              <SubmitButton Title={isLoading ? "SUBMITTING..." : "CHECKOUT"} disabled={isLoading} BtnWhite />
              <Button Title="CANCEL" CloseModal BtnWhite />
            </Group>
          }
          </Form>
        </Modal>
      )}
    </>
  );
}
