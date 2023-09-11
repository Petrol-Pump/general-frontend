import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useAuthCheck = () =>{
    const navigate = useNavigate()
    const [auth, setAuth] = useState()


    useEffect(()=>{
        const authString = Cookies.get("pump_auth")
        if(!authString && !!navigate){
            navigate("../login")
        }else{
            const authObject = JSON.parse(authString)
            setAuth(authObject)
        }
    },[navigate])

    return{
        auth:auth
    }
}