import { AiOutlineSwapRight } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import Input from "../components/input/input.tsx";
import * as Validator from "../util/validator.ts";
import * as Msg from "../util/messages.ts";
import { CiRead } from "react-icons/ci";
import { EyeOff2Outline } from "@styled-icons/evaicons-outline/EyeOff2Outline";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Alert from "../components/alert/alert.tsx";

function Adduser() {
  let location = useLocation();
  let user = location?.state?.user;

  const [avatarImage, setAvetarImage] = useState(
    "../src/assets/images/icon/avator.png"
  );

  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [qtyOnHand, setQtyOnHand] = useState(user ? user.qtyOnHand : "");

  const [descriptionValid, setDescriptionValid] = useState(true);
  const [unitPriceValid, setUnitPriceValid] = useState(true);
  const [qtyValid, setQtyValid] = useState(true);

  const [validateValues, setValidateValues] = useState(false);

  const [stateIsUpdate, setStateIsUpdate] = useState(false);

  const [btnText, setBtnText] = useState("Save Item");

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("");
  const [alertMsg, setAlertMsg] = useState<string>("");

  let navigate = useNavigate();

  useEffect(() => {
    // if (user) {
    //   setAvetarImage(`http://localhost:9000/images/${user.proPic}`);
    //   let name_array = user.fullName.split(" ");
    //   setDescription(name_array[0]);
    //   setUnitPrice(name_array[1]);
    //   setStateIsUpdate(true);
    //   setBtnText("Update User");
    // }
  }, []);

  const handleInput = (e: any, type: string): void => {
    switch (type) {
      case "description":
        setDescription(e.target.value);
        setDescriptionValid(Validator.descriptionValidator(e.target.value));
        break;
      case "unitPrice":
        setUnitPrice(e.target.value);
        setUnitPriceValid(Validator.floteNumberValidator(e.target.value));
        break;
      case "qtyOnHand":
        setQtyOnHand(e.target.value);
        setQtyValid(Validator.numberValidator(e.target.value));
        break;
    }
  };

  const cheackValues = () => {
    !Validator.descriptionValidator(description)
      ? setDescriptionValid(false)
      : !Validator.floteNumberValidator(unitPrice)
      ? setUnitPriceValid(false)
      : !Validator.numberValidator(qtyOnHand)
      ? setQtyValid(false)
      : setValidateValues(true);
    return;
  };

  const cheackValuesForUpdate = () => {
    !Validator.descriptionValidator(description)
      ? setDescriptionValid(false)
      : !Validator.floteNumberValidator(unitPrice)
      ? setUnitPriceValid(false)
      : !Validator.emailValidator(qtyOnHand);
    return;
  };

  async function creatUser() {
    const config = {
      headers: {
        Authorization: Cookies.get("tk"),
        "Content-Type": "multipart/form-data",
      },
    };

    if (stateIsUpdate) {
      cheackValuesForUpdate();
      if (validateValues) {
        await updateUserAction(config);
      }
    } else {
      cheackValues();
      if (validateValues) {
        await createUserAction(config);
      }
    }
  }

  const createUserAction = async (config: any) => {
    const data = JSON.stringify({
      description: description,
      unitPrice: unitPrice,
      qtyOnHand: qtyOnHand,
    });

    alert("hellooo");

    await axios
      .post(
        "http://localhost:8080/Billing_System_war_exploded/item",
        data,
        config
      )
      .then((response) => {
        // alert(response.data.message)
        showAlert("success", response.data.message);
        // setTimeout(function () {
        //   navigate("/admin/user");
        // }, 1001);
      })
      .catch((error) => {
        // alert(error)
        console.log(error);
        showAlert("error", "");
      });
  };

  const updateUserAction = async (config: any) => {
    const data = JSON.stringify({
      description: description,
      unitPrice: unitPrice,
      qtyOnHand: qtyOnHand,
    });

    let formData = new FormData();

    await axios
      .put("http://localhost:9000/user/update", formData, config)
      .then((response) => {
        console.log(response.data.data);
        showAlert("success", response.data.message);
        setTimeout(function () {
          navigate("/home/item");
        }, 1001);
        // window.location.reload();
      })
      .catch((error) => {
        showAlert("error", "");
        console.log(error);
      });
  };

  function showAlert(type: string, msg: string) {
    setAlertType(type);
    setAlertMsg(msg);
    setAlertOpen(true);
  }

  return (
    <section className={"bg-transparent w-full min-h-full flex flex-col"}>
      <Alert
        open={alertOpen}
        type={alertType}
        message={alertMsg}
        onClose={() => setAlertOpen(false)}
      />

      <h1 className={"text-3xl font-[500] w-full font-Poppins"}>
        Create a new user
      </h1>

      <div className={"pt-2 text-[14px] font-[500] w-full flex flex-row"}>
        <a
          className={
            "mr-2 text-gray-800 flex flex-row justify-center items-center"
          }
        >
          Home <AiOutlineSwapRight className={"mx-2"} />
        </a>
        <a
          className={
            "mr-2 text-gray-800 flex flex-row justify-center items-center"
          }
        >
          Item <AiOutlineSwapRight className={"mx-2"} />
        </a>
        <a className={"mr-2 text-gray-500"}>New item</a>
      </div>

      <main
        className={
          "w-full lg:flex-1 h-max gap-10 lg:gap-5 flex mt-5 flex-col lg:flex-row justify-around items-center lg:items-start "
        }
      >
        {/*form container --------------------------------------------------------*/}
        <div
          className={
            "w-full sm:w-[400px] lg:w-[65%] min-h-[500px] h-max bg-white " +
            "rounded-xl py-5 px-10 lg:mr-6 shadow-1"
          }
        >
          <h1 className={"mb-3 border-b font-Euclid font-[500] text-md"}>
            Item Details
          </h1>

          <div className={"w-full flex flex-row justify-between flex-wrap"}>
            {/*lg:max-w-[350px] lg:min-w-fit*/}
            <div className={"w-[350px] "}>
              <Input
                id={"description"}
                type={"text"}
                value={description}
                required={true}
                callBack={handleInput}
                label={"Description"}
                placeholder={"Description"}
                validate={descriptionValid}
                message={Msg.descriptionMsg}
                borderRequired={true}
              />
            </div>

            <div className={"w-[350px]"}>
              <Input
                id={"unitPrice"}
                value={unitPrice}
                type={"number"}
                required={true}
                callBack={handleInput}
                label={"Unit Price"}
                placeholder={"Unit Price"}
                validate={unitPriceValid}
                message={Msg.floteNumberMsg}
                borderRequired={true}
              />
            </div>
          </div>

          <div
            className={"w-full flex flex-row justify-between flex-wrap mt-2"}
          >
            <div className={"w-[350px]"}>
              <Input
                id={"qtyOnHand"}
                type={"number"}
                value={qtyOnHand}
                required={true}
                callBack={handleInput}
                label={"Qty On Hand"}
                placeholder={"Qty On Hand"}
                validate={qtyValid}
                message={Msg.numberMsg}
                borderRequired={true}
              />
            </div>
          </div>

          <div className={"w-full flex flex-row justify-end flex-wrap mt-3"}>
            <button
              className={"btn btn-create text-[14px]"}
              onClick={creatUser}
            >
              {btnText}
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Adduser;
