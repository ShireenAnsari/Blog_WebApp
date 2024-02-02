import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
export const Authcontext=createContext();
export const AuthcontextProvider=({children})=>{
    const [currentUser,setCurrentuser]=useState(JSON.parse(localStorage.getItem("user")) || null)
    const login=async(inputs)=>{
            const res=await axios.post('auth/login',inputs);
            console.log(res);
            if(res.status===200)
            {
              Cookies.set("auth",res.data.token);
              setCurrentuser(res.data);
               console.log(currentUser);
              toast.success('Logged in');
               
            }
        
    }
    const logout=()=>{
            Cookies.remove("auth");
           setCurrentuser(null);
           console.log(currentUser);
    }
    useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser])
    axios.defaults.baseURL = "http://localhost:8800/api/";
    return (
         <Authcontext.Provider value={{currentUser,login,logout}}>
          {children}
    </Authcontext.Provider>

    )
    
}