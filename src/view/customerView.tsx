import { CiCirclePlus, CiEdit, CiTrash } from "react-icons/ci";
import Alert from "../components/alert/alert.tsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import Input from "../components/input/input.tsx";
import Model from "../components/model/model.tsx";
import { CiSearch } from "react-icons/ci";

interface CustomerData {
  accountNumber: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  uniteConsumed: number;
}

function CustomerView() {
  const [dataArray, setDataArray] = useState<CustomerData[]>([]);

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("");
  const [alertMsg, setAlertMsg] = useState<string>("");

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const [searchText, setSearchText] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    getAllItem();
  }, []);

  function getAllItem() {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    axios
      .get(`http://localhost:8080/Billing_System_war_exploded/customer`, config)
      .then((response) => {
        console.log(response.data.data);

        setDataArray(response.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  }

  // Delete item ------------------------------------------------------------------------------------------------
  function clickDeleteBtn(id: string) {
    setDeleteId(id);
    setOpen(true);
  }

  async function handleDeleteItem() {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .delete(
        `http://localhost:8080/Billing_System_war_exploded/item?id=${deleteId}`,
        config
      )
      .then((response) => {
        alert(response.data.message);
        console.log(response.data);
        showAlert("success", response.data.message);
      })
      .catch((error) => {
        alert(error);
        console.log(error);
        showAlert("error", "Something went wrong!");
      });
    setOpen(false);
    setDeleteId("");
    getAllItem();
  }

  function showAlert(type: string, msg: string) {
    setAlertType(type);
    setAlertMsg(msg);
    //Open alert
    setAlertOpen(true);
  }

  function handleInput(e: any, name: string) {
    let search = e.target.value;
    console.log(name + " : " + search);
    setSearchText(e.target.value);
  }

  return (
    <section
      className={
        "w-full min-h-[100%] bg-white flex flex-col items-center rounded-md"
      }
    >
      <div className={" w-full h-max px-2 "}>
        <label className={"font-Euclid text-2xl"}>Customer</label>
      </div>

      <Alert
        open={alertOpen}
        type={alertType}
        message={alertMsg}
        onClose={() => setAlertOpen(false)}
      />

      {/*--------------------------------------------------------------------------------------*/}

      <div
        className={
          "w-full h-max flex flex-row justify-between items-center px-2"
        }
      >
        {/*//////////////  Search Box ///////////////////////*/}
        <div
          className={
            "bg-white w-[25rem] h-[48px] border-2 border-blue-500 rounded-md " +
            "flex flex-row items-center justify-between"
          }
        >
          <div className={"w-[90%]"}>
            <Input
              id={"search"}
              value={searchText}
              type={"text"}
              placeholder={"Search customer acc num here..."}
              required={false}
              callBack={handleInput}
              validate={true}
              borderColor={"5561F5"}
              borderRequired={false}
            />
          </div>

          <div className={"flex-1 flex items-center justify-center"}>
            <CiSearch string={40} />
          </div>
        </div>

        <button
          onClick={() => navigate("/home/add-customer")}
          className={`px-3 py-2 bg-[#4455EF] hover:bg-[#2355FF] text-white font-Euclid
                     flex flex-row items-center cursor-pointer rounded-md`}
        >
          <CiCirclePlus size={20} className={"mr-2"} />

          <span>Add Customer</span>
        </button>

        {/* <Alert
          open={alertOpen}
          type={alertType}
          message={alertMsg}
          onClose={() => setAlertOpen(false)}
        />  */}

        <Model open={open} onClose={() => setOpen(false)}>
          <button
            key={"1"}
            className="btn btn-danger w-full"
            onClick={() => handleDeleteItem()}
          >
            Delete
          </button>
          <button
            key={"2"}
            className="btn btn-light w-full"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </Model>
      </div>

      {/*//Table container --------------------------------------------------------------------------------*/}

      <div className={"flex-1 w-full  px-3 pt-2 pb-2 h-[500px]"}>
        <div
          className={
            "scroll-bar border-x border-gray-200 rounded-[5px]" +
            " min-h-[450px] h-max max-h-[690px] min-w-[503px]" +
            " overflow-auto z-[20000] transition duration-150 ease-linear"
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
                <th className={"py-2 pl-2 text-left uppercase "}>
                  account num
                </th>
                <th className={"py-2 text-left uppercase "}>full name</th>
                <th className={"py-2 text-left uppercase"}>address</th>
                <th className={"py-2 text-left uppercase"}>contact</th>
                <th className={"py-2 text-left uppercase"}>unite consumed</th>
                <th className={`block py-2 text-center`}>ACTION</th>
              </tr>
            </thead>

            <tbody className={"mt-3 "}>
              {dataArray.map((value, index) => {
                return (
                  <tr key={index} className={"bg-white"}>
                    <td
                      className={"font-medium text-[13px] border-b text-left"}
                    >
                      {value.accountNumber}
                    </td>

                    <td
                      className={
                        "font-medium text-[13px] border-b text-left max-w-[300px]"
                      }
                    >
                      {value.fullName}
                    </td>

                    <td
                      className={"font-medium text-[13px] border-b text-left"}
                    >
                      {value.address}
                    </td>

                    <td
                      className={"font-medium text-[13px] border-b text-left"}
                    >
                      {value.phoneNumber}
                    </td>

                    <td
                      className={"font-medium text-[13px] border-b text-left"}
                    >
                      {value.uniteConsumed}
                    </td>

                    <td className={`table-cell w-[10%] border-b text-center`}>
                      <button
                        onClick={() =>
                          navigate("/home/add-item", {
                            state: { customer: value },
                          })
                        }
                        className={
                          "p-1 border border-black rounded-[6px] group" +
                          " hover:border-[#2355FF] mr-3"
                        }
                      >
                        <CiEdit
                          size={18}
                          className={"group-hover:text-[#2355FF] "}
                        />
                      </button>

                      <button
                        className={
                          "p-1 border rounded-[6px] group border-red-600 hover:bg-[#F4EBEF]"
                        }
                        onClick={() => clickDeleteBtn(value.accountNumber)}
                      >
                        <CiTrash size={18} className={"text-red-600"} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default CustomerView;
