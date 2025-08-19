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

function AddCustomer() {
  let location = useLocation();
  let customer = location?.state?.customer;

  const [fullName, setFullName] = useState<string>(customer ? customer.fullName : "");
  const [address, setAddress] = useState<string>(customer ? customer.address : "");
  const [phoneNumber, setPhoneNumber] = useState<string>(customer ? customer.phoneNumber : "");

  const [fullNameValid, setFullNameValid] = useState(true);
  const [addressValid, setAddressValid] = useState(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);

  const [validateValues, setValidateValues] = useState(false);

  const [stateIsUpdate, setStateIsUpdate] = useState(false);

  const [btnText, setBtnText] = useState("Save Customer");

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<string>("");
  const [alertMsg, setAlertMsg] = useState<string>("");

  let navigate = useNavigate();

  useEffect(() => {
    if (customer) {
      setStateIsUpdate(true);
      setBtnText("Update Customer");
    }
  }, []);

  const handleInput = (e: any, type: string): void => {
    switch (type) {
      case "fullName":
        setFullName(e.target.value);
        setFullNameValid(Validator.fullNameValidator(e.target.value));
        break;
      case "address":
        setAddress(e.target.value);
        setAddressValid(Validator.addressValidator(e.target.value));
        break;
      case "phoneNumber":
        setPhoneNumber(e.target.value);
        setPhoneNumberValid(Validator.contactValidator(e.target.value));
        break;
    }
  };

  const cheackValues = () => {
    !Validator.fullNameValidator(fullName)
      ? setFullNameValid(false)
      : !Validator.addressValidator(address)
      ? setAddressValid(false)
      : !Validator.contactValidator(phoneNumber)
      ? setPhoneNumberValid(false)
      : setValidateValues(true);
    return;
  };

  const cheackValuesForUpdate = () => {
    !Validator.fullNameValidator(fullName)
      ? setFullNameValid(false)
      : !Validator.addressValidator(address)
      ? setAddressValid(false)
      : !Validator.contactValidator(phoneNumber)
      ? setPhoneNumberValid(false)
      : setValidateValues(true);
    return;
  };

  async function creatUser() {
    const config = {
      headers: {
        "content-type": "application/json",
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
      fullName: fullName,
      address: address,
      phoneNumber: phoneNumber,
      uniteConsumed: 0
    });

    await axios
      .post(
        "http://localhost:8080/Billing_System_war_exploded/customer",
        data,
        config
      )
      .then((response) => {
        alert(response.data);
        showAlert("success", "Create successfully 🌟");
        setTimeout(function () {
          navigate("/home/customer");
        }, 1001);
      })
      .catch((error) => {
        // alert(error)
        console.log(error);
        showAlert("error", "");
      });
  };

  const updateUserAction = async (config: any) => {
    const data = JSON.stringify({
      accountNumber: customer.accountNumber,
      fullName: fullName,
      address: address,
      phoneNumber: phoneNumber,
      uniteConsumed: customer.uniteConsumed,
    });

    await axios
      .put(
        "http://localhost:8080/Billing_System_war_exploded/customer",
        data,
        config
      )
      .then((response) => {
        console.log(response.data.data);
        showAlert("success", "Update successfully 🌟");
        setTimeout(function () {
          navigate("/home/customer");
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
        Create a new customer
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
          Customer <AiOutlineSwapRight className={"mx-2"} />
        </a>
        <a className={"mr-2 text-gray-500"}>New customer</a>
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
            Customer Details
          </h1>

          <div className={"w-full flex flex-row justify-between flex-wrap"}>
            {/*lg:max-w-[350px] lg:min-w-fit*/}
            <div className={"w-[350px] "}>
              <Input
                id={"fullName"}
                type={"text"}
                value={fullName}
                required={true}
                callBack={handleInput}
                label={"Full Name"}
                placeholder={"Full Name"}
                validate={fullNameValid}
                message={Msg.descriptionMsg}
                borderRequired={true}
              />
            </div>

            <div className={"w-[350px]"}>
              <Input
                id={"address"}
                value={address}
                type={"text"}
                required={true}
                callBack={handleInput}
                label={"Address"}
                placeholder={"Address"}
                validate={addressValid}
                message={Msg.addressMsg}
                borderRequired={true}
              />
            </div>
          </div>

          <div
            className={"w-full flex flex-row justify-between flex-wrap mt-2"}
          >
            <div className={"w-[350px]"}>
              <Input
                id={"phoneNumber"}
                type={"text"}
                value={phoneNumber}
                required={true}
                callBack={handleInput}
                label={"Phone Number"}
                placeholder={"Phone Number"}
                validate={phoneNumberValid}
                message={Msg.contactMsg}
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

export default AddCustomer;
