import React, {useEffect, useState} from 'react'
import { useAuthCheck } from '../../utils/custom-hooks'
import axios from 'axios'
import "./styles.css"

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
    useEffect(()=>{
        console.log(auth)
    },[auth])
    // https://9b89-20-29-248-56.ngrok-free.app/swagger/index.html
    useEffect(()=>{
        axios({
            url: 'https://9b89-20-29-248-56.ngrok-free.app/api/Products',
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
        <div>
            <table>
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
                    </tr>
                </thead>
                <tbody>
                    {
                        dummyData.map((item, index)=><tr key={index}>
                            <td>{`${item.productId}`}</td>
                            <td>{`${item.productDescription}`}</td>
                            <td>{`${item.unitsInStock}`}</td>
                            <td>{`${item.pricePerUnit}`}</td>
                            <td>{`${item.thresholdUnits}`}</td>
    
                        </tr>)
                    }
                </tbody>
                
            </table>
        </div>
    )
}

export default EmployeeLanding