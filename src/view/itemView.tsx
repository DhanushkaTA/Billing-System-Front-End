import { CiCirclePlus, CiEdit, CiTrash } from "react-icons/ci";
// import Model from "../components/model/model.tsx";
import Alert from "../components/alert/alert.tsx";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

interface ItemData {
  _id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  regularPrice: number;
  salePrice: number;
  qty: number;
  warranty: string;
  stockStatus: boolean;
  itemPic: string;
}

function ItemView() {
  const [dataArray, setDataArray] = useState<ItemData[]>([]);

  
  return (
    <section
      className={
        "w-full min-h-[100%] bg-white flex flex-col items-center rounded-md"
      }
    >
      <div className={" w-full h-max px-2 "}>
        <label className={"font-Euclid text-2xl"}>Item</label>
      </div>

      {/*<Alert open={alertOpen}*/}
      {/*       type={alertType}*/}
      {/*       message={alertMsg}*/}
      {/*       onClose={() => setAlertOpen(false)}*/}
      {/*/>*/}

      {/*--------------------------------------------------------------------------------------*/}

      <div
        className={
          "w-full h-max flex flex-row justify-between items-center px-2"
        }
      >
        {/* <button
          onClick={() => navigate("/admin/add-item")}
          className={`${
            userIdAdmin ? "block" : "hidden"
          }  px-3 py-2 bg-[#4455EF] hover:bg-[#2355FF] text-white font-Euclid
                     flex flex-row items-center cursor-pointer rounded-md`}
        >
          <CiCirclePlus size={20} className={"mr-2"} />

          <span>Add Item</span>
        </button>

        <Alert
          open={alertOpen}
          type={alertType}
          message={alertMsg}
          onClose={() => setAlertOpen(false)}
        /> */}

        {/* <Model open={open} onClose={() => setOpen(false)}>
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
        </Model> */}
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
                <th className={"py-2 pl-2 text-left uppercase "}>item</th>
                <th className={"py-2 text-left "}>CODE</th>
                <th className={"py-2 text-left uppercase "}>description</th>
                <th className={"py-2 text-center uppercase "}>category</th>
                <th className={"py-2 text-left uppercase"}>brand</th>
                <th className={"py-2 text-left uppercase"}>price</th>
                <th className={"py-2 text-left uppercase"}>qty</th>
                <th className={"py-2 text-center uppercase"}>war</th>
                <th
                  className={`block py-2 text-center`}
                >
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody className={"mt-3 "}>
              {dataArray.map((value, index) => {
                return (
                  <tr
                    key={index}
                    className={`${
                      value.qty === 0 ? "bg-red-100/50" : "bg-white"
                    }`}
                  >
                    <td className={`flex flex-row items-center border-b `}>
                      <div>
                        <img
                          // src={"http://localhost:9000/images/" + value.itemPic}
                          src={"ht/images/"}
                          className={
                            "w-32 h-32 object-fill bg-center bg-cover mr-3"
                          }
                          alt={"item"}
                          title={"Item"}
                        />
                      </div>
                    </td>

                    {/*<td className={`font-medium text-[13px] border-b text-left`}>*/}
                    {/*    {value._id}*/}
                    {/*</td>*/}

                    <td
                      className={"font-medium text-[13px] border-b text-left"}
                    >
                      {value.code}
                    </td>

                    <td
                      className={
                        "font-medium text-[13px] border-b text-left max-w-[300px]"
                      }
                    >
                      {value.name}
                    </td>

                    <td
                      className={"font-medium text-[13px] border-b text-center"}
                    >
                      <span
                        className={
                          "text-[#7600bc] bg-purple-400/30 py-1 px-4 rounded-full"
                        }
                      >
                        {value.category}
                      </span>
                    </td>

                    <td
                      className={"font-medium text-[13px] border-b text-center"}
                    ></td>

                    <td
                      className={"font-medium text-[13px] border-b text-left"}
                    >
                      {value.salePrice}
                    </td>

                    <td
                      className={`font-medium text-[13px] border-b text-left 
                                                    ${
                                                      value.qty === 0
                                                        ? "text-red-600"
                                                        : "text-black"
                                                    }`}
                    >
                      {value.qty}
                    </td>

                    <td
                      className={"font-medium text-[13px] border-b text-center"}
                    >
                      {value.warranty}
                    </td>

                    <td
                      className={`table-cell w-[10%] border-b text-center`}
                    >
                      {/* <button
                        onClick={() =>
                          navigate("/admin/add-item", {
                            state: { item: value, list: list },
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
                      </button> */}

                      {/* <button
                        className={
                          "p-1 border rounded-[6px] group border-red-600 hover:bg-[#F4EBEF]"
                        }
                        onClick={() => clickDeleteBtn(value._id)}
                      >
                        
                        <CiTrash size={18} className={"text-red-600"} />
                      </button> */}
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

export default ItemView;
