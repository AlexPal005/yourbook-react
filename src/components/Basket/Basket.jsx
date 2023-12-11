import {useContext, useEffect, useState} from "react";
import "./Basket.scss"
import {BookListItem} from "./BookListItem.jsx";
import {AuthContext} from "../../context/authContext.jsx";
import axios from "axios";

export const Basket = () => {

    const [books, setBooks] = useState([])
    const [sum, setSum] = useState(0)
    const [updateSum, setUpdateSum] = useState(0)
    const {currentUser} = useContext(AuthContext)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("basket"))) {
            setBooks(JSON.parse(localStorage.getItem("basket")));
        }
    }, [updateSum])

    useEffect(() => {
        let currSum = 0;
        books.forEach(currBook => {
            const count = currBook.count ? currBook.count : 1
            currSum = currSum + currBook.price * count
        })
        setSum(currSum)
    }, [books])

    const clearBasket = () => {
        localStorage.setItem("basket", "[]")
        setUpdateSum(prev => prev + 1)
    }

    const handleAddOrder = () => {
        const resultOrder = {
            totalSum: sum,
            status: "В обробці!",
            userId: currentUser.userId
        }
        axios.post('http://localhost:8081/order/create', resultOrder)
            .then((res) => {
                clearBasket()
            }).catch(err => {
            console.log(err)
        })
        console.log(currentUser)
    }
    return (
        <div className="wrapper-center">
            {
                books?.length ?
                    <div className="basket-wrapper">
                        <span onClick={clearBasket}>Очистити корзину</span>
                        {
                            books.map(book => {
                                return <BookListItem key={book.id} book={book} setUpdateSum={setUpdateSum}/>
                            })
                        }

                        <p>Сума: {sum} грн</p>
                        <div>
                            <button onClick={handleAddOrder}>Замовити</button>
                        </div>
                    </div> :
                    <h3 className="error">Кошик пустий! Перейдіть в каталог та додайте книги!</h3>

            }
        </div>
    )
}