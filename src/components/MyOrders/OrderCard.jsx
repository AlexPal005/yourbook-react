import "./MyOrders.scss"
/* eslint-disable react/prop-types */
export const OrderCard = ({order}) => {
    return(
        <div className="order-card">
            <div>
                <p>Створено: {new Date(order.date).toLocaleDateString()}</p>
                <p>Сума: {order.totalSum} грн</p>
            </div>
            <p>№: {order.id}</p>
            <h3 className="green">Статус: {order.status}</h3>
        </div>
    )
}