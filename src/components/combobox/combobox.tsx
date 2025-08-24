import { CgChevronDown } from "react-icons/cg";
import {useEffect, useState} from "react";

interface Item{
    text:string,
    code:string,
    icon?:any
}

interface Props {
    id:string,
    value:string,
    placeholder:string,
    label?:string,
    item:Item[],
    onlyIcon:boolean,
    callBack?: Function,
    data?:any
}

function Combobox(props:Props) {

    const [isDown, setIsDown] = useState<boolean>(true)

    // const [placeholder, setPlaceholder] = useState<string>(props.item[0].text)
    const [placeholder, setPlaceholder] = useState<string>()
    const [icon, setIcon] = useState("")
    const [code, setCode] = useState("")

    // const [selectValue, setSelectValue] = useState<Item>(null)

    useEffect(() => {
        props.label ?
            setPlaceholder("") : setPlaceholder(props.placeholder)
            // setPlaceholder(props.item[0].text) : setPlaceholder(props.placeholder)

        props.item.map(value => {
            if(value.text===props.value){
                console.log(value)
                clickFun(value.text, value.icon)
            }
        })

        if (props.value){
            setPlaceholder(props.value)
        }


    }, []);

    // notify parent component about new value
    useEffect(() => {
        console.log(placeholder)

        props.callBack(placeholder,code)
    }, [placeholder]);


    function clickFun(text:string, code:string){
        setPlaceholder(text)
        setCode(code)
        // setIcon(code)
        setIsDown(true)
        console.log("combo")
        console.log(props.item)
    }

    return(
        <div
            id={props.id}
            className={" font-Euclid cursor-pointer my-1 relative mr-0"}>
            <label className={`flex flex-col w-full font-Euclid mb-[2px] flex-wrap 
            text-[12px] font-medium text-[#2e2e2e]
            ${props.label ? "block" : "hidden"}`}>
                {props.label}
            </label>

            {/*-------------------------------------------------------------------------*/}

            <div
                onClick={() => setIsDown(value => !value)}
                className={"min-w-[230px] border rounded-md shadow drop-shadow-4 overflow-hidden" +
                    " flex flex-row items-center justify-between h-[45px] p-5 font-[400]"}>
                <img src={icon}
                     className={`w-[100px] ${props.onlyIcon ? "mr-0" : "mr-5"} 
                     ${icon ? "block" : "hidden"}`}
                     alt={'icon'}
                     title={placeholder}/>
                <span className={`${icon ? "hidden" : "block"}`}>{placeholder}</span>
                <CgChevronDown
                    className={`${isDown ? null : "rotate-180"} transition-all`}/>
            </div>

            <ul
                className={`absolute w-full max-h-[200px] bg-white shadow rounded-md mt-3 overflow-y-auto scroll-bar
                            ${isDown ? "h-0" : "h-fit p-4 "} transition-all z-50`}>

                {
                    props.item.map((value,index) => {

                        return <li
                            key={index}
                            id={value.text}
                            onClick={() => clickFun(value.text, value.code)}
                            className={`relative flex flex-row items-center h-[45px] cursor-pointer  
                                        bg-white rounded-md px-2 hover:bg-[#F2F2F2]  overflow-hidden
                                        ${value.icon ? "justify-center" : null}
                                        ${isDown ? "hidden" : "block"}`}>
                            <img src={value.icon}
                                 className={`w-[100px] 
                                 ${props.onlyIcon ? "mr-0" : "mr-5"} 
                                 ${value.icon ? "block" : "hidden"}`}
                                 alt={'icon'}
                                 title={value.text}/>
                            <span className={`text-[14px] ${value.icon ? "hidden" : "block"}`}>{value.text}</span>
                        </li>

                    })
                }
            </ul>

        </div>
    )
}

export default Combobox;