import React, {useEffect, useState} from 'react'
import { useAuthCheck } from '../../utils/custom-hooks'
import axios from 'axios'
import "./styles.css"
import { useNavigate } from 'react-router-dom'
import { global_constants } from '../../constants'

const dummyData = [
    {
        "productId": 1,
        "productDescription": "Wclome to tJohn",
        "unitsInStock": 1,
        "pricePerUnit": 10,
        "suppliedBy": 1,
        "thresholdUnits": 100
    }
]

const EmployeeLanding = () =>{
    const {auth} = useAuthCheck()
    const [products, setProducts] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        console.log(auth)
    },[auth])
    // https://9b89-20-29-248-56.ngrok-free.app/swagger/index.html
    useEffect(()=>{
        axios({
            url: `${global_constants.url}/api/Products`,
            method: 'get',
            headers: {
            'Content-Type': 'application/json',
            "ngrok-skip-browser-warning":"any",
            'Access-Control-Allow-Origin' : '*'
            }
        })
        .then((data)=>{
            setProducts(data.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })

    },[])

    return(
        <div className="grandWrapper" >
            <table >
                <thead>
                    <tr>
                        <th>
                            Product ID
                        </th>
                        <th>
                            Product Description
                        </th>
                        <th>
                            Units in stock
                        </th>
                        <th>
                            Price per Unit
                        </th>
                        <th>
                            Threshold Units
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map((item, index)=><tr key={index}>
                            <td>{`${item.productId}`}</td>
                            <td>{`${item.productDescription}`}</td>
                            <td>{`${item.unitsInStock}`}</td>
                            <td>{`${item.pricePerUnit}`}</td>
                            <td>{`${item.thresholdUnits}`}</td>
                            <td>
                                <button type="button" onClick={()=>{navigate(`/employee/external/${item.productId}`)}} className='btn btn-info'>
                                    Place order
                                </button>
                            </td>
                        </tr>)
                    }
                </tbody>
                
            </table>
        </div>
    )
}

export default EmployeeLanding