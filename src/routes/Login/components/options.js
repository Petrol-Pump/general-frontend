import React from 'react'
import { modes } from '../constants'

const Options = (props) =>{
    const {setMode} = props
    return (
        <div className="d-flex flex-column w-100">
            <div className='d-flex'>
                <p className="mode-title">Choose Login option</p>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <button className="btn btn-primary" onClick={()=>{setMode(modes.employee)}} >
                    Employee
                </button>
                <button className="btn btn-primary margin-left" onClick={()=>{setMode(modes.contractor)}} >
                    Contractor
                </button>
            </div>
        </div>
    )
}

export default Options