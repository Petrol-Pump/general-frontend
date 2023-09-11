import React, {useState} from 'react'
import { authenticateUser } from '../common-scripts'
import { useNavigate } from 'react-router-dom'
import { modes } from '../constants'

const ContractorForm = (props) => {
    const { setMode } = props
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const isAuthenticated = await authenticateUser(username, password, "contractor");
        if (isAuthenticated) {
            navigate('/contractor');
        } else {
            alert("Wrong username or password")
        }
    };
    return (
        <div className="d-flex flex-column w-100">
            <div className='d-flex flex-row justify-content-between'>
                <button className='btn btn-secondary' onClick={() => { setMode(modes.options) }} >Back</button>
                <p className="mode-title margin-left">Enter Contractor credentials</p>
            </div>
            <form className="d-flex flex-column justify-content-between" onSubmit={handleLogin}>
                <div className="form-group align-items-start w-100">
                    <div className="w-100 form-group-label" >Username</div>
                    <input type="text" className="form-control" id="inputUsername" value={username} onChange={(e)=>{setUsername(e.target.value)}} placeholder="Enter username" />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div className="form-group align-items-start w-100">
                    <div className="w-100 form-group-label" >Password</div>
                    <input type="password" className="form-control" id="contractorPassword" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter password" />
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <button type="submit" className='btn btn-primary margin-top' >Login</button>
            </form>
        </div>
    )
}

export default ContractorForm