import {useEffect, useState} from "react";
import axios from "./../../Axios.js";
import {OrderCard} from "../MyOrders/OrderCard.jsx";

export const Profit = () => {
    const [allOrders, setAllOrders] = useState([])
    const [monthProfit, setMonthProfit] = useState(0)

    useEffect(() => {
        axios.get("/orders/getAll")
            .then(res => {
                setAllOrders(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    //calc profit
    useEffect(() => {
        const d = new Date();
        let currMonth = d.getMonth();
        let currProfit = 0;
        allOrders.forEach(order => {
            const orderDate = new Date(order.date)
            if (currMonth === orderDate.getMonth()) {
                currProfit += order.totalSum
            }
        })
        setMonthProfit(currProfit)
    }, [allOrders]);
    return (
        <div className="add-book wrapper-center">
            <h1>Кількість замовлень: {allOrders?.length}</h1>
            <h1>Обіг за цей місяць: {monthProfit} грн</h1>
            <h1 className="green title-orders">Всі замовлення: </h1>
            <div className=" my-orders">
                {
                    allOrders.map(order => {

                        return <OrderCard order={order} key={order.id}/>
                    })
                }
            </div>
        </div>
    )
}