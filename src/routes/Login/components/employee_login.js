import React, {useState} from 'react'
import { modes } from '../constants'
import { useNavigate } from 'react-router-dom'
import { authenticateUser } from '../common-scripts'

const EmployeeForm = (props) =>{
    const {setMode} = props
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const isAuthenticated = await authenticateUser(username, password, "employee");
        if (isAuthenticated) {
            navigate('/employee');
        } else {
            alert("Wrong username or password")
        }
    };
    return (
        <div className="d-flex flex-column w-100">
            <div className='d-flex flex-row justify-content-between'>
                <button className='btn btn-secondary' onClick={()=>{setMode(modes.options)}} >Back</button>
                <span className="mode-title margin-left">Enter Employee credentials</span>
            </div>
            <form className="d-flex flex-column justify-content-between" onSubmit={handleLogin}>
                <div className="form-group align-items-start w-100">
                    <div className="w-100 form-group-label" >Username</div>
                    <input type="text" class="form-control" id="inputUsername" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter username"/>
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group align-items-start w-100">
                    <div className="w-100 form-group-label" >Password</div>
                    <input type="password" class="form-control" id="employeePassword" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter password"/>
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <button className='btn btn-primary margin-top' type="submit">Login</button>
            </form>
        </div>
    )
}

export default EmployeeForm