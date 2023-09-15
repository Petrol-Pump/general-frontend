import React, {useEffect, useState} from 'react'
import { useAuthCheck } from '../../utils/custom-hooks'
import { global_constants } from '../../constants'
import axios from 'axios'
import Cookies from 'js-cookie'
import "./styles.css"
const ExternalOrdersList = () =>{ 
    const [externalOrders, setExternalOrders] = useState()
    const getEmployeeID = () =>{
        try{
            const employeeId = JSON.parse(Cookies.get("pump_auth")).userid
            if(!!employeeId){
                return employeeId
            }
            else{
                return 0
            }
        }
        catch(err){
            return 0 // 1 is dummy user_id
        }
    }

    useEffect(()=>{
        axios({
            method:"get",
            url:`${global_constants.url}/api/ExternalOrders`,
            headers:{
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning":"any",
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(result=>{
            console.log(result.data)
            setExternalOrders(result.data)
        }).catch(err=>{
            console.log(err.message)
        })
    },[])
    const {auth} = useAuthCheck()
    useEffect(()=>{
        console.log(auth)
    },[auth])
    return(
        <div className="grandWrapper" >
            <table >
                <thead>
                    <tr>
                        <th>
                            External Order ID
                        </th>
                        <th>
                            Buyer Name
                        </th>
                        <th>
                            Overseen By
                        </th>
                        <th>
                            Product Bought
                        </th>
                        <th>
                            Total Payable
                        </th>
                        <th>
                            Units Bought
                        </th>
                        <th>
                            Buyer Phone
                        </th>
                        <th>
                            Date Ordeed
                        </th>
                    </tr>
                </thead>
                {
                    // "intOrderid": 0.238651982868589,
                    // "suppliedBy": 1,
                    // "productBought": 1,
                    // "unitsBought": 500,
                    // "totalPayable": 50,
                    // "orderConfirmed": false,
                    // "productDelivered": false,
                    // "orderDispatched": false,
                    // "dateOrdered": "0001-01-01",
                }
                <tbody>
                    {
                        externalOrders?.map((item, index)=><tr key={index}>
                            <td>{`${item.extOrderid}`}</td>
                            <td>{`${item.buyerName}`}</td>
                            <td>{`${item.overseenBy}`}</td>
                            <td>{`${item.productBought}`}</td>
                            <td>{`${item.totalPayable}`}</td>
                            <td>{`${item.unitsBought}`}</td>
                            <td>{`${item.buyerPhone}`}</td>
                            <td>{`${new Date(item.dateOrdered).toISOString().split("T")[0]}`}</td>
                            
                        </tr>)
                    }
                </tbody>
                
            </table>
        </div>
    )
}

export default ExternalOrdersList