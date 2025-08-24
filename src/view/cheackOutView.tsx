import Card from "../components/card/card.tsx";
import Input from "../components/input/input.tsx";
import BillsItem from "../components/billsItem/billsItem.tsx";
import { CiCirclePlus, CiEdit, CiTrash, CiSearch } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Combobox from "../components/combobox/combobox.tsx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoCard } from "react-icons/io5";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { ScanTable } from "@styled-icons/fluentui-system-filled/ScanTable";
import { OrderDto } from "../dto/orderDto.ts";
import { ItemDetailsDto } from "../dto/itemDetails.dto.ts";
import Cookies from "js-cookie";
import Alert from "../components/alert/alert.tsx";
import Model from "../components/model/model.tsx";
import { PiBarricadeDuotone } from "react-icons/pi";
import * as Msg from "../util/messages.ts";
import * as Validator from "../util/validator.ts";
import {useReactToPrint} from "react-to-print";


interface ItemData {
  itemCode: string;
  description: string;
  unitPrice: number;
  qtyOnHand: number;
}

interface ItemCartData {
  itemCode: string;
  description: string;
  unitPrice: number;
  qtyOnHand: number;
  total: number;
}

interface CustomerData {
  accountNumber:string;
  fullName:string;
  address:string;
  phoneNumber:string;
  uniteConsumed:string;
}

function CheackOutView() {
  const [brand, setBrand] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  // const [brandList, setBrandList] = useState<BrandData[]>([]);

  const [dataArray, setDataArray] = useState<ItemData[]>([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [recodeCount, setRecodeCount] = useState(5);

  const container1 = useRef(null);
  const container2 = useRef(null);

  const bill_container_1 = useRef(null);

  const [itemContainerHeight, setItemContainerHeight] = useState(0);
  const [billContainerHeight, setBillContainerHeight] = useState(0);

  const [total, setTotal] = useState<number>(0);
  const [total_qty, setTotal_qty] = useState<number>(0);

  const [searchText, setSearchText] = useState("");

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("");
  const [alertMsg, setAlertMsg] = useState<string>("");

  const [open, setOpen] = useState(false);

  // const list: any[] = [{ text: "Select One" }];
  const [list, setList] = useState<any[]>([])

  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [qtyOnHand, setQtyOnHand] = useState<number>(0);
  const [qty, setQty] = useState<number>(0);

  const [qtyValid, setQtyValid] = useState(true);

  const [cartList, setCartList] = useState<ItemCartData[]>([]);

  const [selectItem, setSelectItem] = useState<ItemData | null>();

  const [customerList, setCustomerList] = useState<CustomerData[]>([])
  const [cusNameList, setCusNameList] = useState<any[]>([])
  const [customerId, setCustomerId] = useState<string>("All");

  const contentRef = useRef<HTMLDivElement>();
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    getAllItem();
    getCustomerList();

  }, []);

  useEffect(() => {
    console.log(billContainerHeight + "  bill2");
  }, [billContainerHeight]);



  useEffect(() => {
    getAllItem();
  }, [category, brand]);

  useEffect(() => {

  }, [pageNumber, recodeCount]);

  async function getAllItem() {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .get(
        `http://localhost:8080/Billing_System_war_exploded/item`,
        config
      )
      .then((response) => {
        console.log(response.data);

        setDataArray(response.data.data);



      })
      .catch((error) => {
        alert(error);
      });
  }

  async function getCustomerList() {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
        .get(
            `http://localhost:8080/Billing_System_war_exploded/customer`,
            config
        )
        .then((response) => {
          console.log(response.data);

          setCustomerList(response.data.data);
        })
        .catch((error) => {
          alert(error);
        });
  }

  useEffect(() => {
    let itemList: any[] = [{ text: "Select One" }];

    dataArray.map((value) => {
      itemList.push({
        text: value.description,
        code: value.itemCode,
      });
    });

    setList(itemList)
  }, [dataArray]);

  useEffect(() => {
    let nameList: any[] = [{ text: "Select One" }];

    customerList.map((value) => {
      nameList.push({
        text: value.accountNumber,
        code: value.accountNumber,
      });
    });

    setCusNameList(nameList)

    console.log(cusNameList)
  }, [customerList]);

  function setItemDetails(desc: string, code: string) {
    // alert(desc + " : " + code);
    let itemByCode = dataArray.find((item) => item.itemCode === code);

    console.log(dataArray)
    console.log(list)

    if (itemByCode) {
      console.log(itemByCode.qtyOnHand)
      setQtyOnHand(itemByCode.qtyOnHand)
      setUnitPrice(itemByCode.unitPrice)

      setSelectItem(itemByCode);
    }

    console.log(dataArray)
    console.log(list)

  }

  function handleInput(e: any, name: string) {

    console.log("Name : "+name)

    switch (name) {
      case "description":
        setDescription(e.target.value);
        break;
      case "unitPrice":
        setUnitPrice(parseInt(e.target.value));
        break;
      case "qty":
        setQty(parseInt(e.target.value));
        setQtyValid((e.target.value < qtyOnHand));
        break;
    }
  }

  useEffect(() => {
    if (searchText.length <= 0) {
      getAllItem();
    } else {
      getSearchItem();
    }
  }, [searchText]);

  async function getSearchItem() {
    const config = {
      headers: {
        Authorization: Cookies.get("tk"),
      },
    };

    // await axios
    //   .get(`http://localhost:9000/item/get/search?name=${searchText}`, config)
    //   .then((response) => {
    //     console.log(response.data.data);
    //     setDataArray(response.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

  function setItemToArray() {

    if (selectItem){

      if (qty <= 0) {
        showAlert("error_2", "Please add qty!");
        return;
      }else {
        if (qty != null) {
          selectItem.qtyOnHand = qty;
        }
      }

      //temp array
      let tempArray = [...cartList];

      const existingItem = cartList.find(i => i.itemCode === selectItem.itemCode);
      // check in array
      if (!existingItem) {
        //added to array
        tempArray.push({
          itemCode:selectItem.itemCode,
          description:selectItem.description,
          unitPrice:selectItem.unitPrice,
          qtyOnHand:selectItem.qtyOnHand,
          total:(selectItem.unitPrice * selectItem.qtyOnHand)
        })
        setCartList(tempArray)
      }else {
        //update qty count
        for (let i in tempArray){
          if (tempArray[i].itemCode === selectItem.itemCode){
            console.log(tempArray[i].qtyOnHand + qty)
            tempArray[i].qtyOnHand = tempArray[i].qtyOnHand + qty
            tempArray[i].total = tempArray[i].unitPrice * tempArray[i].qtyOnHand
          }
        }
        setCartList(tempArray)
      }

      setDescription("");
      setQty(0);
      setUnitPrice(0);
      setQtyOnHand(0)

    }else {
      showAlert("error_2", "Please select item first!");
    }

  }

  useEffect(() => {

    //set total qty
    let tq:number = 0;
    for (let i of cartList){
      tq = tq + i.qtyOnHand;
    }
    setTotal_qty(tq);

    //set total price
    let tp:number = 0;
    for (let i of cartList){
      tp = tp + i.total;
    }
    setTotal(tp)

  }, [cartList]);


  function removeFromCart(code: string) {
    console.log("delete code = "+code)
    let filter = cartList.filter(item => item.itemCode != code);

    console.log(filter)

    setCartList(filter)

  }

  function sentOrder() {


    if (total_qty > 0) {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      let details = [];

      for (const itemDetails of cartList){
        details.push({
          "orderID": "",
          "itemCode": itemDetails.itemCode,
          "unitPrice": itemDetails.unitPrice,
          "qty": itemDetails.qtyOnHand,
          "total": itemDetails.total
        })
      }

      const data = {
        "orderId": "",
        "customerId": customerId,
        "orderDate": new Date().toISOString().slice(0, 19),
        "total": total,
        "orderDetails": details
      }
      console.log(data)

        axios
          .post("http://localhost:8080/Billing_System_war_exploded/order", JSON.stringify(data), config)
          .then((res) => {

            //print doc
            reactToPrintFn()

            setOpen(false);
            showAlert("success", res.data.message+" 🎉");
            setCartList([]);
          })
          .catch((error) => {
            // console.log(error);
            setOpen(false);
            console.log(error?.response?.data);
            showAlert("error_2", "Order not saved! : "+error?.response?.data?.data);
          });
    } else {
      showAlert("error_2", "Add items to cart, Cart is empty 🛒");
    }

    // alert("clear")
    clearForm();
    setCustomerId("");

  }

  function showAlert(type: string, msg: string) {
    setAlertType(type);
    setAlertMsg(msg);
    setAlertOpen(true);
  }

  function clearForm() {
    getAllItem();
    getCustomerList();
  }

  const setCustomer = (desc: string, code: string) => {
    console.log(code);
    setCustomerId(code);
  };

  function showAlert(type: string, msg: string) {
    console.log(type+" : "+msg)
    setAlertType(type);
    setAlertMsg(msg);
    setAlertOpen(true);
  }

  return (
    <section
      className={
        "relative w-full h-[100%] flex flex-row items-center rounded-md"
      }
    >
      <Alert
        open={alertOpen}
        type={alertType}
        message={alertMsg}
        onClose={() => setAlertOpen(false)}
      />

      <Model
        open={open}
        icon={<PiBarricadeDuotone />}
        title={"Conform"}
        des={"Are you sure you want to place this order?"}
        color={"blue-400"}
        colorBg={"blue-300/50"}
        onClose={() => setOpen(false)}
      >
        <button
          key={"1"}
          className="btn btn-conform w-full"
          onClick={() => sentOrder()}
        >
          Conform
        </button>
        <button
          key={"2"}
          className="btn btn-light w-full"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </Model>

      <div
        ref={container1}
        className={`w-[100%] h-[100%] bg-[#F9F8FB] px-3 flex flex-col items-center`}
      >
        <div ref={container2} className={"h-[167px] w-full flex flex-col "}>

          <div
            className={
              "w-full h-max flex flex-row font-Poppins justify-between items-center"
            }
          >
            {/*//////////////  Page Title ///////////////////////*/}

            <strong className={"text-3xl font-[500]"}>Choose Products</strong>

            {/*//////////////  Search Box ///////////////////////*/}
            <div
              className={
                "bg-white w-[25rem] h-[48px] rounded-md flex flex-row items-center justify-between"
              }
            >
              <div className={"w-[90%]"}>
                <Input
                  id={"search"}
                  value={searchText}
                  type={"text"}
                  placeholder={"Search products here..."}
                  required={false}
                  callBack={handleInput}
                  validate={true}
                  borderColor={"F76F2B"}
                  borderRequired={false}
                />
              </div>

              <div className={"flex-1 flex items-center justify-center"}>
                <CiSearch string={40} />
              </div>
            </div>
          </div>

          {/*//////////////  Filter Options ///////////////////////*/}

          <div className={"w-max flex flex-row justify-center items-center"}>
            <div className={"mr-3"}>
              <Combobox
                id={"description"}
                value={brand}
                placeholder={"Select Book"}
                label={"Select Book"}
                callBack={setItemDetails}
                onlyIcon={true}
                item={list}
              />
            </div>

            <div className={"w-[250px]"}>
              <Input
                id={"unitPrice"}
                value={unitPrice.toString()}
                type={"number"}
                required={false}
                callBack={handleInput}
                label={"Unit Price"}
                placeholder={"Unit Price"}
                validate={true}
                // message={Msg.floteNumberMsg}
                borderRequired={true}
              />
            </div>

            <div className={"w-[250px] m-5"}>
              <Input
                id={"qtyOnHand"}
                type={"number"}
                value={qtyOnHand}
                required={false}
                callBack={handleInput}
                label={"Qty On Hand"}
                placeholder={"Qty On Hand"}
                validate={true}
                // message={Msg.numberMsg}
                borderRequired={true}
              />
            </div>

            <div className={"w-[250px] text-[#00458A]"}>
              <Input
                id={"qty"}
                type={"number"}
                value={qty.toString()}
                required={false}
                callBack={handleInput}
                label={"Qty"}
                placeholder={"Qty"}
                validate={qtyValid}
                // message={Msg.numberMsg}
                borderRequired={true}
                // borderColor={'00458A'}
              />
            </div>

            <div className={"m-3 mt-7"}>
              <button
                onClick={setItemToArray}
                className={`px-3 py-2 bg-[#4455EF] hover:bg-[#2355FF] text-white font-Euclid
                                   flex flex-row items-center cursor-pointer rounded-md`}
              >
                <CiCirclePlus size={20} className={"mr-2"} />

                <span>Add Item</span>
              </button>
            </div>

          </div>

        </div>

        {/*//////////////  Items Container ///////////////////////*/}

        {/*scroll-bar overflow-auto*/}
        <div
            ref={contentRef}
          className={
            `w-full h-[445px] max-h-[${itemContainerHeight}px] mt-1 ` +
            "  "
          }
        >
          <div
            className={"flex flex-row justify-between flex-wrap gap-5 h-max"}
          >
            <div
                className={
                    "scroll-bar border-x border-gray-200 rounded-[5px]" +
                    " min-h-[450px] h-max max-h-[690px] min-w-[700px]" +
                    " overflow-auto z-[2] transition duration-150 ease-linear"
                }
            >
              <table
                  id={"userTable"}
                  className={
                      "w-full font-Euclid text-[12px] rounded-md bg-gray-100 border-collapse " +
                      "overflow-auto min-w-[503px]"
                  }
              >

                <thead
                    className={
                      "w-full bg-amber-200 rounded-t-md  min-h-5 sticky top-0 left-0"
                    }
                >
                <tr className={""}>
                  <th className={"py-2 pl-2 text-left uppercase "}>code</th>
                  <th className={"py-2 text-left uppercase "}>description</th>
                  <th className={"py-2 text-left uppercase"}>price</th>
                  <th className={"py-2 text-left uppercase"}>qty</th>
                  <th className={"py-2 text-left uppercase"}>total</th>
                  <th className={`block py-2 text-center`}>ACTION</th>
                </tr>
                </thead>

                <tbody className={"mt-3 "}>
                {cartList.map((value, index) => {
                  return (
                      <tr
                          key={index}
                          className={`bg-white`}
                      >
                        <td
                            className={"font-medium text-[13px] border-b text-left"}
                        >
                          {value.itemCode}
                        </td>

                        <td
                            className={
                              "font-medium text-[13px] border-b text-left max-w-[300px]"
                            }
                        >
                          {value.description}
                        </td>

                        <td
                            className={"font-medium text-[13px] border-b text-left"}
                        >
                          {value.unitPrice}
                        </td>

                        <td
                            className={`font-medium text-[13px] border-b text-left 
                                                    ${
                                value.qtyOnHand === 0
                                    ? "text-red-600"
                                    : "text-black"
                            }`}
                        >
                          {value.qtyOnHand}
                        </td>

                        <td
                            className={"font-medium text-[13px] border-b text-left"}
                        >
                          {value.total}
                        </td>

                        <td className={`table-cell w-[10%] border-b text-center`}>

                          <button
                              className={
                                "p-1 border rounded-[6px] group border-red-600 hover:bg-[#F4EBEF]"
                              }
                              onClick={() => removeFromCart(value.itemCode)}
                          >
                            <CiTrash size={18} className={"text-red-600"}/>
                          </button>
                        </td>
                      </tr>
                  );
                })}
                </tbody>

              </table>
            </div>

            <div
                className={"bg-red-600/10 w-[500px] h-[500px] p-5 flex flex-col items-center justify-between"}
            >
              {/*total qty*/}
              <div
                  className={"w-full h-[70px] bg-white shadow-xl rounded-md flex flex-row items-center justify-between text-xl"}>
                <div className={"h-full w-[68%] flex items-center justify-center"}>
                  <label>Total Qty</label>
                </div>
                <div className={"h-full w-[28%] flex items-center justify-center"}>
                  {total_qty}
                </div>
              </div>

              {/*total qty*/}
              <div
                  className={"w-full h-[70px] bg-white shadow-xl rounded-md flex flex-row items-center justify-between text-xl"}>
                <div className={"h-full w-[68%] flex items-center justify-center"}>
                  <label>Net Total</label>
                </div>
                <div className={"h-full w-[28%] flex items-center justify-center"}>
                  {total}
                </div>
              </div>

              {/*customer list*/}

              {/*<div*/}
              {/*    className={"w-full h-max min-h-[70px] p-2 bg-white shadow-xl rounded-md flex flex-row items-center justify-between text-xl"}>*/}
              {/*  */}
              {/*</div>*/}
              <div className={"mr-3"}>
                <Combobox
                    id={"description"}
                    value={brand}
                    placeholder={"Select Customer"}
                    label={"Select Customer"}
                    callBack={setCustomer}
                    onlyIcon={true}
                    item={cusNameList}
                />
              </div>

              <div
                  onClick={() => setOpen(true)}
                  className={"w-[200px] h-[50px] text-white text-md bg-[#4455EF] hover:bg-[#2355FF] " +
                  "flex flex-row items-center justify-center cursor-pointer rounded-md"}>
                <p>
                  Place Order
                </p>
              </div>

            </div>

            {/*<Card/>*/}
            {/*<Card/>*/}
            {/*<Card/>*/}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheackOutView;
