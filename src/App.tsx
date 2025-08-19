import "./App.css";
import Login from "./view/login.tsx";
import ItemView from "./view/itemView.tsx";
import AddItem from "./view/addItem.tsx";
import LoginDetailsView from "./view/loginDetailsView.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OrderView from "./view/orderView.tsx";
import HomeView from "./view/homeView";
import CustomerView from "./view/customerView.tsx";

function App() {
  // const [expanded, setExpanded] = useState(true)
  //
  // function handleSidebar(){
  //     setExpanded(value => !value)
  // }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Login />} />
          <Route path={"/home"} element={<HomeView />}>
            <Route path={"item"} element={<ItemView />} />
            <Route path={"add-item"} element={<AddItem />} />
            <Route path={"customer"} element={<CustomerView />} />
          </Route>
          {/* <Route path={"/admin"} element={<AdminView/>}>
                    <Route path={"admin-dash"} element={<AdminDashboard/>}/>
                    <Route path={"user"} element={<UserView/>}/>
                    <Route path={"item"} element={<ItemView/>}/>
                    <Route path={"add-item"} element={<AddItem/>}/>
                    <Route path={"add-user"} element={<Adduser/>}/>
                    <Route path={"cart"} element={<CheackOutView/>}/>
                    <Route path={"login"} element={<LoginDetailsView/>}/>
                    <Route path={"order"} element={<OrderView/>}/>
                </Route> */}

          
        </Routes>
      </BrowserRouter>

      {/*<Login/>*/}
      {/*<div className={"w-full h-screen flex flex-col justify-center items-center bg-green-200"}>*/}
      {/*</div>*/}
    </>
  );
}

export default App;
