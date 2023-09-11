import React, {useEffect} from 'react'
import { useAuthCheck } from '../../utils/custom-hooks'

const EmployeeLanding = () =>{
    const {auth} = useAuthCheck()
    useEffect(()=>{
        console.log(auth)
    },[auth])
    return(
        <div>
            Hmm yes
            <br/>
            Employee or what
        </div>
    )
}

export default EmployeeLanding