import axios from "axios";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css"

const ExternalOrder = () =>{
    const {product_id} = useParams()
    const [product, setProduct] = useState()
    const [externalOrder, setExternalOrder] = useState({

    })
    const navigate = useNavigate()
    useEffect(()=>{
        if(!Cookies.get("pump_auth") && !!navigate){
            navigate("../login")
        }
    },[navigate])
    useEffect(()=>{
        axios({
            url: `https://9b89-20-29-248-56.ngrok-free.app/api/Products/${product_id}`,
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
        <div >
            <div style={{display:"flex",width:"100%"}}>
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
                                {product?.pricePerUnit}
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
                    </tbody>
                </table>
            </div>
            <form className="d-flex flex-column justify-content-between">
                <div className="form-group align-items-start w-100">
                    <p>Customer Name</p>
                    {/* <input type="text" value={} /> */}
                </div>
            </form>
        </div>
    )
}

export default ExternalOrder