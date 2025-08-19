import {BiCaretLeft,  BiDotsVerticalRounded} from "react-icons/bi";
import React, {useContext, useEffect, useState} from "react";
import SidebarContext from "../../context/contexts"
import Cookies from "js-cookie";
import * as DateUtil from "../../util/DataUtil.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Model from "../model/model.tsx";
import { IoLogOut } from "react-icons/io5";

interface Props{
    children:React.ReactNode,
    email:string
}

function Sidebar(props:Props) {

    const expanded = useContext(SidebarContext)
    const [expandedSide, setExpandedSide] = useState(true)

    let navigate = useNavigate();

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setExpandedSide(expanded)
    }, [expanded]);


    const logOutAction = () => {

        const headers={"content-type" : 'application/json'}

        let data = {
            id : Cookies.get('login_id'),
            logOutDate : DateUtil.getFullDateNow()
        }

        axios.put('http://localhost:9000/login/update',data,{headers:headers})
            .then(response => {

                navigate('/')

        })
            .catch(error => {

                alert("User not logout")
                console.log(error)

            })

    }

    return(
        <aside className={"h-screen w-max sticky top-0 left-0"}>
            <nav className={"h-full flex flex-col  border-r shadow-sm "}>

                <div className={`h-[8.3%]  p-4 pb-2 flex justify-between items-center ${expanded ? "w-full" : "w-max"}`}>

                    <img
                        src={"../src/assets/images/logo/NextGen_Logo.png"}
                        className={` overflow-hidden transition-all 
                                    ${expanded ? "w-[158px]" : "w-0" }`} alt={'icon'}/>

                    <button
                        onClick={() => setExpandedSide(value => !value)}
                        className={"p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"}>
                        {/*{!expanded ? <BiCaretRight /> : <BiCaretLeft/> }*/}
                        {!expanded ? <img src={"../src/assets/images/logo/logo-2.png"}
                                          width={35} height={24.9} alt={'icon'}/> : <BiCaretLeft/> }
                    </button>

                </div>

                {/*---------------------------------------------------*/}

                <SidebarContext.Provider value={expandedSide}>

                    <ul className={"flex-1 px-3"}>
                        {props.children}
                    </ul>

                </SidebarContext.Provider>

                {/*---------------------------------------------------*/}

                <Model
                    open={open}
                    title={"Conform Logout"}
                    des={'Do you wanna logout from the application?'}
                    icon={<IoLogOut size={40} className={"text-red-600"}/>}
                    onClose={() => setOpen(false)}>
                    <button key={'1'} className="btn btn-danger w-full" onClick={() => logOutAction()}>Logout</button>
                    <button key={'2'} className="btn btn-light w-full" onClick={() => setOpen(false)}>Cancel</button>
                </Model>

                <div
                    className={`border-t flex p-3 hover:cursor-pointer hover:bg-red-100/50 group`}
                    onClick={() => setOpen(true)}
                >

                    <div className={"w-10 h-10 bg-red-100 flex items-center justify-center rounded-lg group-hover:bg-red-300"}>

                        <img
                            src="../../../src/assets/images/icon/log_out.png"
                            // src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                            // src="src/assets/images/people/1.jpg"
                            alt="icon"
                            title="log out"
                            className="w-5 h-5 rounded-md"
                        />

                    </div>

                    <div className={`flex justify-between items-center ml-3 
                    overflow-hidden transition-all ${expanded ? "w-[158px] ml-3" : "w-0"}`}>

                        <div className="leading-4 font-Euclid">
                            {/*<h4 className="font-semibold">John Doe</h4>*/}
                            {/*<span className="text-xs text-gray-600">johndoe@gmail.com</span>*/}
                            <h4 className="font-semibold">Log Out</h4>
                            <span className="text-xs text-gray-600">{props.email}</span>
                        </div>
                        <BiDotsVerticalRounded size={20} className={"hover:cursor-pointer"}/>

                    </div>
                </div>


            </nav>
        </aside>
    )
}

export default Sidebar