import React, {useEffect} from 'react'
import { useAuthCheck } from '../../utils/custom-hooks'
const ContractorLanding = () =>{ 
    const {auth} = useAuthCheck()
    useEffect(()=>{
        console.log(auth)
    },[auth])
    return(
        <div>
            Hmm yes
            <br/>
            Contractor or what
        </div>
    )
}

export default ContractorLanding