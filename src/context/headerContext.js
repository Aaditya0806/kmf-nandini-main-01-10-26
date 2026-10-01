import react,{createContext,useContext,useState} from "react";


const MyContext=createContext()

export const MyContextProvider=({children})=>{
    const [isScroll,setIsScroll]=useState(0)
    const [openNav,setOpenNav] = useState(false)
    const [id,setId]=useState(null)

    return (
        <MyContext.Provider value={{isScroll,setIsScroll,id,setId,openNav,setOpenNav}} >
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext=()=>{
    return useContext(MyContext)
}