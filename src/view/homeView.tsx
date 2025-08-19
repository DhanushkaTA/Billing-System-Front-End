import Sidebar from "../components/sidebar/sidebar.tsx";
import SidebarItem from "../components/sidebarItems/sidebarItem.tsx";
import {
  CiAlignBottom,
  CiGrid42,
  CiMicrochip,
  CiPenpot,
  CiShop,
} from "react-icons/ci";
import Header from "../components/header/header.tsx";
import { Outlet } from "react-router-dom";

function HomeView() {
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
      </section>
    </>
  );
}

export default HomeView;
