import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/sidebar.tsx";
import SidebarItem from "../components/sidebarItems/sidebarItem.tsx";
import {
  CiAlignBottom,
  CiGrid42,
  CiMicrochip,
  CiPenpot,
  CiShop,
} from "react-icons/ci";
import { Outlet } from "react-router-dom";
import Header from "../components/header/header.tsx";

function HomeView() {
  const [username, setUsername] = useState("test");
  const [email, setEmail] = useState("hello");
  const [proPic, setProPic] = useState("hhh");

  return (
    <>
      {/* <section
        className={
          "w-full h-screen bg-red-500/0 flex items-center justify-center"
        }
      >
        {/* main container */}
      {/* <div>

            <div>
                ITEM
            </div>

        </div>
      </section>  */}

      <section className={"flex flex-row"}>
        <aside className={"w-max"}>
          <Sidebar
            email="Hello"
            children={[
              // <SidebarItem
              //     key={'1'}
              //     text={"Dashboard"}
              //     // icon={<BiSolidDashboard size={20}/>}
              //     icon={<CiGrid42 size={20}/>}
              //     navigate={"admin-dash"}
              // />,

              <SidebarItem
                key={"3"}
                icon={<CiMicrochip size={20} />}
                text={"Manage Items"}
                navigate={"item"}
              />,

                <SidebarItem
                    key={"8"}
                    icon={<CiAlignBottom size={22} />}
                    text={"Manage Customers"}
                    navigate={"customer"}
                />,

              <SidebarItem
                key={"7"}
                icon={<CiShop size={23} />}
                text={"Place Order"}
                navigate={"cart"}
              />,

              <SidebarItem
                key={"8"}
                icon={<CiPenpot size={22} />}
                text={"Manage Orders"}
                navigate={"order"}
              />,
            ]}
          />
        </aside>

        <main id={"main-content"} className={"flex-1 flex flex-col"}>
          <Header
            username={`${username}`}
            email={`${email}`}
            proPic={`${proPic}`}
            // callBack={handleSidebar}
          />

          {/*------------------------------- Content here ----------------------------------*/}

                    {/*#EDEFEE*/}
                    <section className={"p-3 flex-1 flex justify-center items-center bg-[#F6F8FC]"}>

                        <Outlet/>

                    </section>
        </main>
      </section>
    </>
  );
}

export default HomeView;
