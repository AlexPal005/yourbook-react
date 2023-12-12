import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/authContext.jsx";
import axios from "../../Axios.js";
import "./MyOrders.scss"
import {OrderCard} from "./OrderCard.jsx";

export const MyOrders = () => {
    const [orders, setOrders] = useState([])
    const user = useContext(AuthContext)

    useEffect(() => {
        axios.get(`/orders/${user.currentUser?.userId}`)
            .then(res => {
                setOrders(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [user])

    return (
        <div className="wrapper-center">
            <h1 className="green title-orders">Мої замовлення</h1>
            <div className=" my-orders">
                {
                    orders.map(order => {
                        return <OrderCard order={order} key={order.id}/>
                    })
                }
            </div>
        </div>
    )
}