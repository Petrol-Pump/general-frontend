import React, {useState} from "react";
import "./styles.css"
import Options from "./components/options";
import EmployeeForm from "./components/employee_login"
import ContractorForm from "./components/contractor_login";
import { modes } from "./constants";

const Component = ({mode, setMode}) =>{
    switch(mode){
        case modes.options:
            return(<Options setMode={setMode}/>)
        case modes.employee:
            return (<EmployeeForm setMode={setMode} />)
        case modes.contractor:
            return (<ContractorForm setMode={setMode} />)
        default:
            return(<Options setMode={setMode}/>)
    }
}

const Login = () =>{
    const [mode, setMode] = useState(modes.options)
    return(
        <div>
            <div className="d-flex justify-content-center grandwrapper w-100">
                <div className="wrapper d-flex align-items-center justify-content-center">
                    <Component mode={mode} setMode={setMode} />
                </div>
            </div>
        </div>
    )
}

export default Login