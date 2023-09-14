import axios from "axios";
import Cookies from "js-cookie";
import React, {useCallback, useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css"
import { global_constants } from "../../constants";

const ExternalOrder = () =>{
    const getEmployeeID = () =>{
        try{
            return JSON.parse(Cookies.get("pump_auth")).userid
        }
        catch(err){
            return 1 // 1 is dummy user_id
        }
    }

    const {product_id} = useParams()
    const [product, setProduct] = useState()
    const [externalOrder, setExternalOrder] = useState({
        ext_orderId: (new Date()).getMilliseconds()+Math.floor(Math.random()*100),
        buyer_name: "",
        overseen_by: getEmployeeID(),
        product_bought: product?.productId,
        total_payable: 0,
        units_bought: 0,
        buyer_phone: "",
        date_ordered: (new Date()).toISOString().split("T")[0]
    })

    const getTotalPayable = useCallback(() => {
        try{
            return Number(externalOrder?.units_bought * product?.pricePerUnit)
        }
        catch(err){
            console.log(err.message)
            return 0
        }
    },[externalOrder])

    const navigate = useNavigate()
    useEffect(()=>{
        if(!Cookies.get("pump_auth") && !!navigate){
            navigate("../login")
        }
    },[navigate])
    useEffect(()=>{
        axios({
            url: `${global_constants.url}/api/Products/${product_id}`,
            method: 'get',
            headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning":"any",
            'Access-Control-Allow-Origin' : '*'
            }
        }).then((data)=>{
            setProduct(data.data)
        }).catch((err)=>{
            console.log(err.message)
        })
    },[])
    return(
        <div className="grandWrapper w-100" style={{border:"1px solid black"}} >
            <div style={{display:"flex",width:"100%", justifyContent:"center"}}>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                Product ID
                            </th>
                            <td>
                                {product?.productId}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Product Description
                            </th>
                            <td>
                                {product?.productDescription}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Units in Stock
                            </th>
                            <td>
                                {product?.unitsInStock}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Price per unit
                            </th>
                            <td>
                                {`${global_constants.rupeeSign}${product?.pricePerUnit}`}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Threshold Units
                            </th>
                            <td>
                                {product?.thresholdUnits}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                Total payable amount
                            </th>
                            <td>
                                {`${global_constants.rupeeSign}${getTotalPayable()}`}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className ="formWrapper">
                <form className="d-flex flex-column justify-content-between">
                    <div className="form-group align-items-start justify-content-start">
                        <p className="w-100">Customer Name</p>
                        <input 
                            type="text" 
                            className="w-100"
                            value={externalOrder?.buyer_name} 
                            onChange={
                                (e)=>{
                                    setExternalOrder({
                                        ...externalOrder,
                                        buyer_name:e.target.value
                                    })}} 
                            placeholder="Enter buyer name"
                        />
                    </div>
                    <div className="form-group align-items-start justify-content-start">
                        <p className="w-100">Customer phone number</p>
                        <input 
                            type="text" 
                            className="w-100"
                            value={externalOrder?.buyer_phone} 
                            onChange={
                                (e)=>{
                                    setExternalOrder({
                                        ...externalOrder,
                                        buyer_phone:e.target.value
                                    })}} 
                            placeholder="Enter buyer phone"
                        />
                    </div>
                    <div className="form-group align-items-start justify-content-start">
                        <p className="w-100">Units for purchase</p>
                        <input 
                            type="number" 
                            className="w-100"
                            value={externalOrder?.units_bought} 
                            onChange={
                                (e)=>{
                                    setExternalOrder({
                                        ...externalOrder,
                                        units_bought:e.target.value
                                    })}} 
                            placeholder="Enter units for purchase"
                        />
                    </div>
                    <div className="form-group align-items-start justify-content-start">
                        <p className="w-100">Units for purchase</p>
                        <input 
                            type="number" 
                            className="w-100"
                            value={externalOrder?.units_bought} 
                            onChange={
                                (e)=>{
                                    setExternalOrder({
                                        ...externalOrder,
                                        units_bought:e.target.value
                                    })}} 
                            placeholder="Enter units for purchase"
                        />
                    </div>
                    <button type="button" className="margin-vertical btn btn-primary">Place order</button>
                </form>
            </div>
        </div>
    )
}

export default ExternalOrder