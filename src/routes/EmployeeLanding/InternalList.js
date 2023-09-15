import React, {useEffect, useState} from 'react'
import { useAuthCheck } from '../../utils/custom-hooks'
import { global_constants } from '../../constants'
import axios from 'axios'
import Cookies from 'js-cookie'
import "./styles.css"
const InternalList = () =>{ 
    const getContractorID = () =>{
        try{
            const contractorID = JSON.parse(Cookies.get("pump_auth")).userid
            if(!!contractorID){
                return contractorID
            }
            else{
                return 1
            }
        }
        catch(err){
            return 1 // 1 is dummy user_id
        }
    }

    
    const [internalOrders, setInternalOrders] = useState()
    const load_orders =() =>{
        axios({
            method:"get",
            url:`${global_constants.url}/api/InternalOrders/`,
            headers:{
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning":"any",
                'Access-Control-Allow-Origin' : '*'
            }
        }).then(result=>{
            setInternalOrders(result.data)
        }).catch(err=>{
            alert(err.message)
        })
    }
    useEffect(()=>{
        load_orders()
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
                            Internal Order ID
                        </th>
                        <th>
                            Supplied by Contractor
                        </th>
                        <th>
                            Product ID
                        </th>
                        <th>
                            Units Bought
                        </th>
                        <th>
                            Total Payable
                        </th>
                        <th>
                            Order Confirmed?
                        </th>
                        <th>
                            Order Delivered?
                        </th>
                        <th>
                            Order Dispatched?
                        </th>
                        <th>
                            Date Ordered
                        </th>
                        <th></th>
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
                        internalOrders?.map((item, index)=><tr key={index}>
                            <td>{`${item.intOrderid}`}</td>
                            <td>{`${item.suppliedBy}`}</td>
                            <td>{`${item.productBought}`}</td>
                            <td>{`${item.unitsBought}`}</td>
                            <td>{`${item.totalPayable}`}</td>
                            <td>
                                {`${item.orderConfirmed==true?"yes":"no"}`}
                                {   item.orderConfirmed==false?
                                    <button className='btn btn-primary' onClick={()=>{axios({
                                        method:"put",
                                        url:`${global_constants.url}/api/InternalOrders/${item.intOrderid}/update`
                                    }).then(result=>{load_orders()}).catch(err=>console.log(err.message))}}>
                                        {item.orderConfirmed?"Change to no":"Change to yes"}
                                    </button>:<></>
                                }
                                
                            </td>
                            <td>
                                {`${item.productDelivered==true?"yes":"no"}`}
                                {   item.productDelivered==false && item.orderDispatched==true?
                                    <button className='btn btn-primary' onClick={()=>{axios({
                                        method:"put",
                                        url:`${global_constants.url}/api/InternalOrders/${item.intOrderid}/updateproduct`
                                    }).then(result=>{load_orders()}).catch(err=>console.log(err.message))}}>
                                        {item.productDelivered?"Change to no":"Change to yes"}
                                    </button>:<></>
                                }
                            </td>
                            <td>
                                {`${item.orderDispatched==true?"yes":"no"}`}
                                
                            </td>
                            <td>{`${new Date(item.dateOrdered).toISOString().split("T")[0]}`}</td>
                            
                        </tr>)
                    }
                </tbody>
                
            </table>
        </div>
    )
}

export default InternalList