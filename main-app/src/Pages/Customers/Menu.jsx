import { useState } from "react";
import "../../assets/css/pages/customers/Menu.sass";
import {
  Title,
  Body_addclass,
  Main,
  Section,
  Group,
  Box,
  Inputbox,
  ItemMenu,
  Modal,
  Form,
  Outputfetch,
  InsertFileButton,
  Button,
  DateText,
  TimeText,
  Radio,
  CheckedItem,
  SubmitButton,
} from "../../Exporter/component_exporter";
import { useStateContext } from "../../Contexts/ContextProvider";
import { createWorker } from "tesseract.js";
import useFetchProduct from "../../hooks/service/fetchProducts";
import useFetchOrder from "../../hooks/uni/fetchProducts";
import useCreateOrder from "../../hooks/orders/createOrderCustomer";

export default function MenuPage() {
  // this file is subject for optimization
  Title("Metro 7 | Menu");
  Body_addclass("Menu-PAGE");
  const { token, user } = useStateContext();
  const { categories } = useFetchOrder();
  const { menuItems, selectedCategory, setSelectedCategory } =
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
  } = useCreateOrder();

  const menulistdata = menuItems.map((product) => ({
    id: product.id,
    image: product.image_url,
    product_name: product.product_name,
    price: product.price,
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
      {user && user.id ? (
        <Main Row>
          <Group Class="leftside" Col>
            <Section Title="Menu Order" Class="menu">
              <Group Col>
                <Box Class="search">
                  <Inputbox Title="Search" Type="search" />
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
                    auth
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
            <Group Class="diningopts">
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
              <h3>TOTAL ITEM</h3>
              <div className="itemlist">
                <CheckedItem
                  List={checkedorders}
                  addItemToOrder={addItemToOrder}
                  removeItemFromOrder={removeItemFromOrder}
                />
              </div>
            </Group>
            <hr />
            <Group Class="paymentsum" Col>
              <article>
                <h3>PAYMENT SUMMARY</h3>
                <div>
                  <h3>TOTAL PRICE:</h3>
                  <h4>₱{Number(formData.totalPrice).toFixed(2)}</h4>
                </div>
                {/* <div>
                  <h3>DISCOUNT:</h3>
                  <h4>₱{discountAmount.toFixed(2)}</h4>
                </div> */}
              </article>
              <Button Title="CHECKOUT" OpenModal="CheckoutModal" />
            </Group>
          </Box>
        </Main>
      ) : (
        <Main>
          <Section Title="Menu Order" Class="menu-notauth">
            <Group Col>
              <Box Class="search">
                <Inputbox Title="Search" Type="search" />
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
      )}
      {token && (
        <Modal Modal="CheckoutModal">
          <Form Title="CHECKOUT" FormThreelayers OnSubmit={submitOrder}>
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
                  Value={`₱${Number(formData.totalPrice).toFixed(2)}`}
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
              <Outputfetch Title="Discount" Value={`₱${discount.toFixed(2)}`} OutCol OutWhite />
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
              <Group>
                <img />
                <Group Col>
                  <p>
                    Please pay a 50% DOWNPAYMENT. Orders without a payment
                    receipt will remain pending. Failure to pay on time will
                    result in cancellation.
                  </p>
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

                        setFormData((prev) => ({
                          ...prev,
                          refNumber: referenceNumber,
                          downpayment: parsedAmount,
                        }));
                      }
                    }}
                  />
                </Group>
              </Group>
            </Group>

            <Group Class="buttonside">
              <Button Title="CANCEL" CloseModal BtnWhite />
              <SubmitButton
                Title="CHECKOUT"
                BtnWhite
              />
            </Group>
          </Form>
        </Modal>
      )}
    </>
  );
}
